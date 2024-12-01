import Game from '../models/Game.js';

export const createGame = async (req, res) => {
  try {
    const newGame = new Game(req.body);
    await newGame.save();
    res.status(201).json(newGame);
  } catch (error) {
    res.status(400).json({ message: 'Error creating game', error });
  }
};

export const getAllGames = async (req, res) => {
  try {
    const {
      title,
      genre,
      minReleaseYear,
      maxReleaseYear,
      minRating,
      maxRating,
      developer,
      minWeight,
      maxWeight,
    } = req.query;

    const filter = {};

    if (title) filter.title = { $regex: title, $options: 'i' };
    if (genre) filter.genre = genre;
    if (developer) filter.developer = { $regex: developer, $options: 'i' };
    if (minReleaseYear) filter.releaseYear = { ...filter.releaseYear, $gte: Number(minReleaseYear) };
    if (maxReleaseYear) filter.releaseYear = { ...filter.releaseYear, $lte: Number(maxReleaseYear) };
    if (minRating) filter.rating = { ...filter.rating, $gte: Number(minRating) };
    if (maxRating) filter.rating = { ...filter.rating, $lte: Number(maxRating) };
    if (minWeight) filter.weight = { ...filter.weight, $gte: Number(minWeight) };
    if (maxWeight) filter.weight = { ...filter.weight, $lte: Number(maxWeight) };

    const games = await Game.find(filter).populate('developer');
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching games', error });
  }
};

export const getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id).populate('developer');
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching game', error });
  }
};

export const updateGame = async (req, res) => {
  try {
    const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedGame) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(updatedGame);
  } catch (error) {
    res.status(400).json({ message: 'Error updating game', error });
  }
};

export const deleteGame = async (req, res) => {
  try {
    const deletedGame = await Game.findByIdAndDelete(req.params.id);
    if (!deletedGame) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json({ message: 'Game deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting game', error });
  }
};
