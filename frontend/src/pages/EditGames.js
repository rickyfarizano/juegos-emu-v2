// src/pages/EditGames.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EditGames.css'; // Importa el archivo CSS para los estilos

const EditGames = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); // Estado para la imagen

  useEffect(() => {
    fetchGames();
  }, []);

  // Función para obtener todos los juegos
  const fetchGames = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/games');
      setGames(response.data);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  // Función para manejar la edición de un juego
  const handleEdit = (game) => {
    setSelectedGame(game);
    setTitle(game.title);
    setGenre(game.genre);
    setReleaseYear(game.releaseYear);
    setDescription(game.description);
    setImage(null); // Restablecer imagen al seleccionar un juego
  };

  // Función para manejar la eliminación de un juego
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/games/${id}`);
      fetchGames(); // Actualiza la lista después de eliminar
    } catch (error) {
      console.error('Error deleting game:', error);
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const gameData = new FormData();
    gameData.append('title', title);
    gameData.append('genre', genre);
    gameData.append('releaseYear', releaseYear);
    gameData.append('description', description);
    if (image) {
      gameData.append('image', image); // Añade la imagen al FormData
    }

    try {
      if (selectedGame) {
        // Actualiza un juego existente
        await axios.put(`http://localhost:5000/api/games/${selectedGame._id}`, gameData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        // Crea un nuevo juego
        await axios.post('http://localhost:5000/api/games', gameData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      fetchGames();
      clearForm();
    } catch (error) {
      console.error('Error saving game:', error);
    }
  };

  // Función para limpiar el formulario
  const clearForm = () => {
    setSelectedGame(null);
    setTitle('');
    setGenre('');
    setReleaseYear('');
    setDescription('');
    setImage(null); // Restablecer la imagen
  };

  return (
    <div className="edit-games-container">
      
      <form onSubmit={handleSubmit} className="game-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
          required
        />
        <input
          type="number"
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
          placeholder="Año de lanzamiento"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción"
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
        />
        {selectedGame && selectedGame.image && (
          <div className="current-image">
            <img
              src={`http://localhost:5000/${selectedGame.image}`}
              alt={selectedGame.title}
              style={{ width: '100px', height: 'auto' }}
            />
            <p>Imagen actual</p>
          </div>
        )}
        <button type="submit" className="submit-button">{selectedGame ? 'Actualizar Juego' : 'Agregar Juego'}</button>
        <button type="button" onClick={clearForm} className="cancel-button">Cancelar</button>
      </form>
      
      <ul className="games-list">
        {games.map((game) => (
          <li key={game._id} className="game-item">
            <h4>{game.title}</h4>
            {game.image && (
              <img
                src={`http://localhost:5000/${game.image}`}
                alt={game.title}
                style={{ width: '50px', height: 'auto', marginLeft: '10px' }}
              />
            )}
            <div className="action-buttons">
              <button onClick={() => handleEdit(game)} className="small-action-button">Editar</button>
              <button onClick={() => handleDelete(game._id)} className="small-action-button">Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditGames;
