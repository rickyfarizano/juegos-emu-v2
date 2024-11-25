import axios from 'axios';

const API_URL = 'http://localhost:5000/routes/games';

export const createGame = async (gameData) => {
  const response = await axios.post(API_URL, gameData);
  return response.data;
};

export const getGames = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getGameById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateGame = async (id, gameData) => {
  const response = await axios.put(`${API_URL}/${id}`, gameData);
  return response.data;
};

export const deleteGame = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
