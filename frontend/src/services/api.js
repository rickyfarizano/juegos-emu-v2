import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const getGames = () => api.get('/games');
export const createGame = (gameData) => api.post('/games', gameData);
