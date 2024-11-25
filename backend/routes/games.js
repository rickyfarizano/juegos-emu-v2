// routes/games.js
import express from 'express';
import Game from '../models/Game.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get('/', async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching games', error });
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  const { title, genre, releaseYear, rating, description } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const newGame = new Game({
      title,
      genre,
      releaseYear,
      rating,
      description,
      image,
    });

    const savedGame = await newGame.save();
    res.status(201).json(savedGame);
  } catch (error) {
    res.status(400).json({ message: 'Error creating game', error });
  }
});

router.put('/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { title, genre, releaseYear, description } = req.body;
  let image = req.file ? req.file.path : null;

  try {
    const updatedGame = await Game.findByIdAndUpdate(
      id,
      {
        title,
        genre,
        releaseYear,
        description,
        ...(image && { image }),
      },
      { new: true }
    );

    if (!updatedGame) {
      return res.status(404).json({ message: 'Game not found' });
    }

    res.json(updatedGame);
  } catch (error) {
    res.status(400).json({ message: 'Error updating game', error });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedGame = await Game.findByIdAndDelete(id);
    if (!deletedGame) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json({ message: 'Game deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting game', error });
  }
});

export default router;
