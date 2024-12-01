import express from 'express';
import Game from '../models/Game.js';
import multer from 'multer';
import { deleteGame, updateGame } from '../controllers/gameController.js';

const router = express.Router();

// Configuración de multer para manejar archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Crear un nuevo juego
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, genre, releaseYear, rating, description, weight } = req.body;

    if (!title || !genre || !releaseYear || !weight) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newGame = new Game({
      title,
      genre,
      releaseYear: Number(releaseYear),
      weight: Number(weight),
      rating: rating ? Number(rating) : null,
      description,
      image: req.file ? req.file.path : null,
    });

    await newGame.save();
    res.status(201).json(newGame);
  } catch (error) {
    console.error('Error creating game:', error);
    res.status(500).json({ message: 'Error creating game', error: error.message });
  }
});

// Obtener todos los juegos con filtros opcionales
router.get('/', async (req, res) => {
  try {
    const {
      title,
      genre,
      minReleaseYear,
      maxReleaseYear,
      minRating,
      maxRating,
      developer,
      minWeight,
      maxWeight,
    } = req.query;

    const filter = {};

    if (title) filter.title = { $regex: title, $options: 'i' };
    if (genre) filter.genre = genre;
    if (developer) filter.developer = { $regex: developer, $options: 'i' };
    if (minReleaseYear) filter.releaseYear = { ...filter.releaseYear, $gte: Number(minReleaseYear) };
    if (maxReleaseYear) filter.releaseYear = { ...filter.releaseYear, $lte: Number(maxReleaseYear) };
    if (minRating) filter.rating = { ...filter.rating, $gte: Number(minRating) };
    if (maxRating) filter.rating = { ...filter.rating, $lte: Number(maxRating) };
    if (minWeight) filter.weight = { ...filter.weight, $gte: Number(minWeight) };
    if (maxWeight) filter.weight = { ...filter.weight, $lte: Number(maxWeight) };

    const games = await Game.find(filter);
    res.status(200).json(games);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ message: 'Error fetching games', error: error.message });
  }
});

// Obtener juegos por categoría
router.get('/category/:genre', async (req, res) => {
  try {
    const { genre } = req.params;
    const games = await Game.find({ genre });

    if (games.length === 0) {
      return res.status(404).json({ message: 'No se encontraron juegos para esta categoría' });
    }

    res.status(200).json(games);
  } catch (error) {
    console.error('Error fetching games by category:', error);
    res.status(500).json({ message: 'Error fetching games by category', error: error.message });
  }
});

// Actualizar un juego existente
router.put(
  '/:id',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'gallery', maxCount: 10 },
  ]),
  async (req, res) => {
    try {
      const gameId = req.params.id;
      const updatedData = { ...req.body };

      if (req.files.image) {
        updatedData.image = req.files.image[0].path;
      }
      if (req.files.gallery) {
        updatedData.gallery = req.files.gallery.map((file) => file.path);
      }

      const updatedGame = await Game.findByIdAndUpdate(gameId, updatedData, {
        new: true,
      });

      if (!updatedGame) {
        return res.status(404).json({ message: 'Juego no encontrado' });
      }

      res.status(200).json(updatedGame);
    } catch (error) {
      console.error('Error updating game:', error);
      res.status(500).json({ message: 'Error updating game', error: error.message });
    }
  }
);

// Eliminar un juego
router.delete('/:id', async (req, res) => {
  try {
    const gameId = req.params.id;
    const deletedGame = await Game.findByIdAndDelete(gameId);

    if (!deletedGame) {
      return res.status(404).json({ message: 'Juego no encontrado' });
    }

    res.status(200).json({ message: 'Juego eliminado con éxito' });
  } catch (error) {
    console.error('Error deleting game:', error);
    res.status(500).json({ message: 'Error deleting game', error: error.message });
  }
});

export default router;
