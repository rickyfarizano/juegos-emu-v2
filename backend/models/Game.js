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
  image: { 
    type: String,
    required: false,
  },
});

const Game = mongoose.model('Game', GameSchema);
export default Game;
