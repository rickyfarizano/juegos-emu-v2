
// src/views/Admin/Admin.jsx
import React, { useState } from 'react';
import { useGameContext } from '../../context/GameContext';  // Ajusta la ruta según corresponda
import axios from 'axios';

const Admin = () => {
  const { addGame } = useGameContext();  // Desestructurar 'addGame' correctamente

  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [weight, setWeight] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('genre', genre);
    formData.append('releaseYear', releaseYear);
    formData.append('weight', weight);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/api/games', formData);
      console.log('Game added:', response.data);

      // Llamar a addGame para actualizar el contexto
      addGame(response.data);  // Pasa el juego recién agregado al contexto
    } catch (error) {
      console.error('Error adding game:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    {/* Título */}
    <div className="relative z-0 w-full mb-5 group">
      <input
        type="text"
        name="floating_title"
        id="floating_title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
      />
      <label
        htmlFor="floating_title"
        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
      >
        Título
      </label>
    </div>

    {/* Género */}
    <div className="relative z-0 w-full mb-5 group">
      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        required
      >
        <option value="">Seleccione un género</option>
        <option value="Acción">Acción</option>
        <option value="Aventura">Aventura</option>
        <option value="RPG">RPG</option>
        <option value="Deportes">Deportes</option>
        <option value="FPS">FPS</option>
        <option value="Survival">Survival</option>
        <option value="Horror">Horror</option>
        <option value="Sandbox">Sandbox</option>
        <option value="Souls">Souls</option>
        <option value="Roguelike">Roguelike</option>
      </select>
      <label
        htmlFor="floating_genre"
        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
      >
        Género
      </label>
    </div>

    {/* Año de lanzamiento */}
    <div className="relative z-0 w-full mb-5 group">
      <input
        type="number"
        name="floating_releaseYear"
        id="floating_releaseYear"
        value={releaseYear}
        onChange={(e) => setReleaseYear(e.target.value)}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
      />
      <label
        htmlFor="floating_releaseYear"
        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
      >
        Año de lanzamiento
      </label>
    </div>

    {/* Peso (en GB) */}
    <div className="relative z-0 w-full mb-5 group">
      <input
        type="number"
        name="floating_weight"
        id="floating_weight"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
      />
      <label
        htmlFor="floating_weight"
        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
      >
        Peso (en GB)
      </label>
    </div>

    {/* Imagen */}
    <div className="relative z-0 w-full mb-5 group">
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        accept="image/*"
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      />
      <label
        htmlFor="floating_image"
        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
      >
        Imagen
      </label>
    </div>

    <button
      type="submit"
      className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
    >
      Agregar Juego
    </button>
  </form>
  );
};

export default Admin;
