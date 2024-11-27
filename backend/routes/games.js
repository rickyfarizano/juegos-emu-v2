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

    // Verificación de datos necesarios
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

// Obtener todos los juegos
router.get('/', async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ message: 'Error fetching games', error: error.message });
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

      // Manejo de archivos recibidos
      if (req.files.image) {
        updatedData.image = req.files.image[0].path;
      }
      if (req.files.gallery) {
        updatedData.gallery = req.files.gallery.map((file) => file.path);
      }

      const updatedGame = await Game.findByIdAndUpdate(gameId, updatedData, {
        new: true, // Devolver el documento actualizado
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
