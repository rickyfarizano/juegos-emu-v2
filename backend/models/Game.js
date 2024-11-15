// models/Game.js
import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  genre: {
    type: String,
    required: true,
    trim: true
  },
  releaseYear: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    trim: true
  },
  developer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Developer', // referencia al modelo de desarrollador
    required: true
  }
});

const Game = mongoose.model('Game', GameSchema);
export default Game;

