import React, { useState } from 'react';
import axios from 'axios';
import './AddGame.css';

const AddGame = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('genre', genre);
    formData.append('releaseYear', releaseYear);
    formData.append('rating', rating);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/games', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Game added:', response.data);
    } catch (error) {
      console.error('Error adding game:', error);
    }
  };

  return (
    <div className="add-game-container">
      
      <form onSubmit={handleSubmit} className="game-form">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        >
          <option value="">Seleccione un género</option>
          <option value="Acción">Acción</option>
          <option value="Aventura">Aventura</option>
          <option value="RPG">RPG</option>
          <option value="Deportes">Deportes</option>
        </select>
        <input
          type="number"
          placeholder="Año de lanzamiento"
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Calificación"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
        />
        <button type="submit" className="submit-button">Agregar Juego</button>
      </form>
    </div>
  );
};

export default AddGame;
