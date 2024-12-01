import express from 'express';
import Game from '../models/Game.js';
import multer from 'multer';
import { deleteGame, updateGame } from '../controllers/gameController.js';

const router = express.Router();

// Configuración de multer para manejar archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Define la carpeta para los archivos subidos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Nombre único para el archivo
  },
});

const upload = multer({ storage });

// Crear un nuevo juego
router.post('/', upload.single('image'), async (req, res) => {
  try {
    // Extracción de datos del body de la solicitud
    const {
      title,
      genre,
      releaseYear,
      rating,
      description,
      weight,
      developer,
      youtubeUrl,
      requirements,
      downloadLink,
    } = req.body;

    // Verificación de datos necesarios
    if (!title || !genre || !releaseYear || !weight) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Verificación y asignación de los requisitos (si existen)
    const parsedRequirements = requirements ? requirements : {}; // No es necesario usar JSON.parse si ya es un objeto

    // Asegurarse de que releaseYear y weight sean números válidos
    const releaseYearNum = releaseYear ? Number(releaseYear) : null;
    const weightNum = weight ? Number(weight) : null;

    // Crear un nuevo objeto de juego
    const newGame = new Game({
      title,
      genre,
      releaseYear: releaseYearNum,
      weight: weightNum,
      rating: rating ? Number(rating) : null,
      description,
      image: req.file ? req.file.path : null, // Si existe una imagen, se guarda su ruta
      developer,
      youtubeUrl,
      requirements: {
        gpu: parsedRequirements.gpu || null,
        ram: parsedRequirements.ram || null,
        cpu: parsedRequirements.cpu || null,
      },
      downloadLink,
    });

    // Guardar el nuevo juego en la base de datos
    await newGame.save();
    res.status(201).json(newGame); // Enviar la respuesta con el juego creado
  } catch (error) {
    // Manejo de errores
    if (error.name === 'ValidationError') {
      console.error('Validation Error:', error.message);
      return res.status(400).json({ message: 'Validation Error', details: error.errors });
    }
    console.error('Error creating game:', error.message);
    res.status(500).json({ message: 'Error creating game', error: error.message });
  }
});

// Obtener todos los juegos con filtros opcionales
router.get('/', async (req, res) => {
  try {
    const games = await Game.find();
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

      // Actualización del juego en la base de datos
      const updatedGame = await Game.findByIdAndUpdate(gameId, updatedData, {
        new: true,
      });

      if (!updatedGame) {
        return res.status(404).json({ message: 'Juego no encontrado' });
      }

      res.status(200).json(updatedGame); // Enviar el juego actualizado
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

    res.status(200).json({ message: 'Juego eliminado con éxito' }); // Respuesta al eliminar el juego
  } catch (error) {
    console.error('Error deleting game:', error);
    res.status(500).json({ message: 'Error deleting game', error: error.message });
  }
});

export default router;
