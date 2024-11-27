// models/Game.js
import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  releaseYear: { 
    type: Number, 
    required: true, 
    validate: {
      validator: (value) => value >= 1980 && value <= new Date().getFullYear(),
      message: 'El año de lanzamiento debe estar entre 1980 y el año actual',
    },
  },
  rating: { type: Number },
  description: { type: String },
  weight: { type: Number, required: true },
  image: { type: String },  // Guardará la ruta de la imagen
  developer: { type: String }, // Nuevo campo para el desarrollador
  youtubeUrl: { type: String }, // Nuevo campo para el URL de YouTube
  gallery: { type: [String] }, // Nuevo campo para la galería de imágenes (array de strings)
  requirements: { 
    gpu: { type: String }, // Requisitos del GPU
    ram: { type: String }, // Requisitos de RAM
    cpu: { type: String }, // Requisitos del CPU
  },
  downloadLink: { type: String }, // Nuevo campo para el enlace de descarga
});

const Game = mongoose.model('Game', gameSchema);

export default Game;
