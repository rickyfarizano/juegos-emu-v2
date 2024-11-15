// controllers/developerController.js
import Developer from '../models/Developer.js';

// Crear un nuevo desarrollador
export const createDeveloper = async (req, res) => {
  try {
    const newDeveloper = new Developer(req.body);
    await newDeveloper.save();
    res.status(201).json(newDeveloper);
  } catch (error) {
    res.status(400).json({ message: 'Error creating developer', error });
  }
};

// Obtener todos los desarrolladores
export const getAllDevelopers = async (req, res) => {
  try {
    const developers = await Developer.find();
    res.json(developers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching developers', error });
  }
};

// Obtener un desarrollador por ID
export const getDeveloperById = async (req, res) => {
  try {
    const developer = await Developer.findById(req.params.id);
    if (!developer) {
      return res.status(404).json({ message: 'Developer not found' });
    }
    res.json(developer);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching developer', error });
  }
};

// Actualizar un desarrollador
export const updateDeveloper = async (req, res) => {
  try {
    const updatedDeveloper = await Developer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedDeveloper) {
      return res.status(404).json({ message: 'Developer not found' });
    }
    res.json(updatedDeveloper);
  } catch (error) {
    res.status(400).json({ message: 'Error updating developer', error });
  }
};

// Eliminar un desarrollador
export const deleteDeveloper = async (req, res) => {
  try {
    const deletedDeveloper = await Developer.findByIdAndDelete(req.params.id);
    if (!deletedDeveloper) {
      return res.status(404).json({ message: 'Developer not found' });
    }
    res.json({ message: 'Developer deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting developer', error });
  }
};
