// models/Category.js
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,  // Para almacenar la ruta de la imagen asociada a la categoría
  },
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
