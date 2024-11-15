// models/Developer.js
import mongoose from 'mongoose';

const DeveloperSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  founded: {
    type: Date,
    required: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  games: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game' // referencia a los juegos desarrollados
  }]
});

const Developer = mongoose.model('Developer', DeveloperSchema);
export default Developer;
