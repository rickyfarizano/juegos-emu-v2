// server.js
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import cors from 'cors';
import userRoutes from './routes/users.js';
import developerRoutes from './routes/developers.js';
import gameRoutes from './routes/games.js';

// Cargar variables de entorno
dotenv.config();

// Inicializar la aplicación
const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(express.json()); // Permitir procesamiento de JSON en las solicitudes
app.use(cors()); // Habilitar CORS para solicitudes externas

// Definir las rutas
app.use('/routes/users', userRoutes);
app.use('/routes/developers', developerRoutes);
app.use('/routes/games', gameRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.send(`
    <h1>API de Juegos de PlayStation 2</h1>
    <footer>
      <p>Nombre: [Tu Nombre]</p>
      <p>Materia: Aplicaciones Híbridas</p>
      <p>Docente: [Nombre del Docente]</p>
      <p>Comisión: [Comisión]</p>
    </footer>
  `);
});

// Manejo de errores para la conexión a MongoDB
mongoose.connection.on('error', (error) => {
  console.error(`Error connecting to MongoDB: ${error.message}`);
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
