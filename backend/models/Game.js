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
});

const Game = mongoose.model('Game', gameSchema);

export default Game;
