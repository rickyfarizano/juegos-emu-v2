// server.js
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import cors from 'cors';
import userRoutes from './routes/users.js';
import developerRoutes from './routes/developers.js';
import gameRoutes from './routes/games.js'; // Asegúrate de usar .js en la importación
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';

// Configurar el almacenamiento con multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads')); // Especificamos la carpeta de destino
  },
  filename: (req, file, cb) => {
    // Renombramos el archivo para evitar conflictos
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// Crear una instancia de multer con la configuración de almacenamiento
const upload = multer({ storage: storage });

// Cargar variables de entorno
dotenv.config();

// Definir __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Inicializar la aplicación
const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(express.json());
app.use(cors()); // Habilitar CORS
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Servir imágenes desde la carpeta uploads

// Definir las rutas
app.use('/api/users', userRoutes);
app.use('/api/developers', developerRoutes);
app.use('/api/games', gameRoutes);

// Ruta para probar el servidor
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
