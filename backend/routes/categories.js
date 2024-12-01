import express from 'express';
import Category from '../models/Category.js'; // Importa el modelo de categorías

const router = express.Router();

// Ruta para obtener todas las categorías
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find(); // Obtén todas las categorías de la base de datos
    res.json(categories); // Devuelve las categorías en formato JSON
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Error fetching categories' });
  }
});

// Ruta para agregar una nueva categoría
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body; // Obtén los datos de la categoría

    const newCategory = new Category({ name, description }); // Crea una nueva categoría
    await newCategory.save(); // Guarda la categoría en la base de datos

    res.status(201).json(newCategory); // Devuelve la nueva categoría creada
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Error creating category' });
  }
});

export default router;
