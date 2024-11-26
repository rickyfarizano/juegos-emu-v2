// routes/games.js
import express from 'express';
import Game from '../models/Game.js';
import multer from 'multer';

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

router.post('/', upload.single('image'), async (req, res) => {
  try {
    // Log para revisar los datos recibidos
    console.log('Received fields:', req.body);
    console.log('Received file:', req.file);

    const { title, genre, releaseYear, rating, description, weight } = req.body;

    // Verificación de datos necesarios
    if (!title || !genre || !releaseYear || !weight) {
      console.log('Missing required fields');
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newGame = new Game({
      title,
      genre,
      releaseYear,
      rating,
      description,
      weight,
      image: req.file ? req.file.path : null,  // Asegurarse de que se guarda la imagen correctamente
    });

    await newGame.save();
    res.status(201).json(newGame);
  } catch (error) {
    // Log para capturar errores internos
    console.error('Error creating game:', error);
    res.status(500).json({ message: 'Error creating game', error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const games = await Game.find();  // Obtener todos los juegos de la base de datos
    res.status(200).json(games);  // Devolver los juegos en formato JSON
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ message: 'Error fetching games', error: error.message });
  }
});

export default router;
