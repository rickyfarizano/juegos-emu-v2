import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import cors from 'cors';
import userRoutes from './routes/users.js';
import developerRoutes from './routes/developers.js';
import gameRoutes from './routes/games.js'; // Rutas de juegos
import categoryRoutes from './routes/categories.js'; // Ruta para categorías
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';

// Configuración de almacenamiento para Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads')); // Definir la carpeta de destino para las cargas
  },
  filename: (req, file, cb) => {
    // Usar un nombre único para los archivos
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// Instanciar Multer con la configuración definida
const upload = multer({ storage: storage });

// Cargar variables de entorno
dotenv.config();

// Definir __dirname para evitar problemas con ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Inicializar la aplicación Express
const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(express.json()); // Para procesar JSON en las solicitudes
app.use(cors()); // Habilitar CORS para evitar problemas de origen cruzado
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Servir archivos estáticos desde la carpeta "uploads"

// Definir las rutas para los diferentes recursos
app.use('/api/users', userRoutes); // Ruta de usuarios
app.use('/api/developers', developerRoutes); // Ruta de desarrolladores
app.use('/api/games', gameRoutes); // Ruta de juegos
app.use('/api/categories', categoryRoutes); // Nueva ruta de categorías

// Ruta de prueba para asegurar que el servidor esté funcionando
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
