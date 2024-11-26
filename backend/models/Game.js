// models/Game.js
import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  rating: { type: Number },
  description: { type: String },
  weight: { type: String, required: true },  // Asegúrate de que 'weight' esté en el esquema
  image: { type: String },  // Guardará la ruta de la imagen
});

const Game = mongoose.model('Game', gameSchema);

export default Game;
