import express from 'express';
import multer from 'multer';
import {
  createGame,
  getAllGames,
  getGamesByCategory,
  updateGame,
  deleteGame,
} from '../controllers/gameController.js';

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
router.post('/', upload.single('image'), createGame);

// Obtener todos los juegos con filtros opcionales
router.get('/', getAllGames);

// Obtener juegos por categoría
router.get('/category/:genre', getGamesByCategory);

// Actualizar un juego existente
router.put(
  '/:id',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'gallery', maxCount: 10 },
  ]),
  updateGame
);

// Eliminar un juego
router.delete('/:id', deleteGame);

export default router;
