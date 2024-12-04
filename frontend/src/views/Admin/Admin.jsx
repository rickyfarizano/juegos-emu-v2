import React, { useState, useEffect } from 'react';
import { useDeveloperContext } from '../../context/DeveloperContext';
import { useAuth } from '../../context/AuthContext'; // Importando AuthContext
import { Navigate } from 'react-router-dom';

const Admin = () => {
  const [games, setGames] = useState([]);
  const { developers } = useDeveloperContext();
  const [selectedGame, setSelectedGame] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    releaseYear: '',
    weight: '',
    image: null,
    developer: '',
    description: '',
    youtubeUrl: '',
    gallery: [],
    requirements: { gpu: '', ram: '', cpu: '' },
    downloadLink: '',
  });
  const { hasRole } = useAuth(); // Accediendo a la función hasRole

  // Verificación de roles
  /*
  const isAuthorized =
    hasRole('super-admin') || hasRole('admin') || hasRole('admin-game');

  console.log('Is Authorized:', isAuthorized); // Ver si el usuario tiene un rol autorizado

  // Si el usuario no está autorizado, redirigir a "unauthorized"
  if (!isAuthorized) {
    return <Navigate to="/unauthorized" replace />;
  }*/

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/games');
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);

  // Manejo de formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e, field) => {
    if (field === 'gallery') {
      setFormData({ ...formData, gallery: Array.from(e.target.files) });
    } else {
      setFormData({ ...formData, [field]: e.target.files[0] });
    }
  };

  const handleRequirementChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      requirements: { ...formData.requirements, [name]: value },
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      genre: '',
      releaseYear: '',
      weight: '',
      image: null,
      developer: '',
      description: '',
      youtubeUrl: '',
      gallery: [],
      requirements: { gpu: '', ram: '', cpu: '' },
      downloadLink: '',
    });
    setSelectedGame(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formPayload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'requirements') {
        Object.entries(value).forEach(([reqKey, reqValue]) => {
          formPayload.append(`requirements[${reqKey}]`, reqValue);
        });
      } else if (key === 'gallery' && value.length > 0) {
        value.forEach((file, index) => {
          formPayload.append(`gallery[${index}]`, file);
        });
      } else if (key === 'image' && value) {
        formPayload.append(key, value);
      } else if (value && typeof value !== 'object') {
        formPayload.append(key, value);
      }
    });

    try {
      const response = await fetch(
        selectedGame
          ? `http://localhost:5000/api/games/${selectedGame._id}`
          : 'http://localhost:5000/api/games',
        {
          method: selectedGame ? 'PUT' : 'POST',
          body: formPayload,
        }
      );

      if (!response.ok) throw new Error('Error in request');

      const data = await response.json();

      if (selectedGame) {
        setGames((prevGames) =>
          prevGames.map((game) => (game._id === data._id ? data : game))
        );
      } else {
        setGames((prevGames) => [...prevGames, data]);
      }

      resetForm();
    } catch (error) {
      console.error('Error submitting game data:', error);
    }
  };

  const handleDelete = async (gameId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/games/${gameId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setGames((prevGames) => prevGames.filter((game) => game._id !== gameId));
      }
    } catch (error) {
      console.error('Error deleting game:', error);
    }
  };

  const handleEdit = (game) => {
    setSelectedGame(game);
    setFormData({
      title: game.title || '',
      genre: game.genre || '',
      releaseYear: game.releaseYear || '',
      weight: game.weight || '',
      image: null,
      developer: game.developer || '',
      description: game.description || '',
      youtubeUrl: game.youtubeUrl || '',
      gallery: [],
      requirements: {
        gpu: game.requirements?.gpu || '',
        ram: game.requirements?.ram || '',
        cpu: game.requirements?.cpu || '',
      },
      downloadLink: game.downloadLink || '',
    });
  };

  return (
    <div className="admin-container">
      <h1 className="text-3xl mb-4 text-center text-white font-bold mt-4">Gestión de Juegos</h1>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6 bg-white shadow-md rounded-md p-6">
        <h2 className="text-2xl font-bold mb-4">{selectedGame ? 'Editar Juego' : 'Agregar Juego'}</h2>

        {/* Título */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Género */}
        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Género</label>
          <select
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
        </div>

        {/* Año de lanzamiento */}
        <div>
          <label htmlFor="releaseYear" className="block text-sm font-medium text-gray-700">Año de lanzamiento</label>
          <input
            type="number"
            name="releaseYear"
            value={formData.releaseYear}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Peso */}
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Peso (en GB)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Desarrollador */}
        <div>
          <label htmlFor="developer" className="block text-sm font-medium text-gray-700">Desarrollador</label>
          <select
            name="developer"
            value={formData.developer}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Seleccione un desarrollador</option>
            {developers?.map((dev) => (
              <option key={dev._id} value={dev._id}>
                {dev.name}
              </option>
            ))}
          </select>
        </div>

        {/* Descripción */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Requisitos */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Requisitos</label>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="gpu" className="block text-xs text-gray-600">GPU</label>
              <input
                type="text"
                name="gpu"
                value={formData.requirements.gpu}
                onChange={handleRequirementChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900"
                required
              />
            </div>
            <div>
              <label htmlFor="ram" className="block text-xs text-gray-600">RAM</label>
              <input
                type="text"
                name="ram"
                value={formData.requirements.ram}
                onChange={handleRequirementChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900"
                required
              />
            </div>
            <div>
              <label htmlFor="cpu" className="block text-xs text-gray-600">CPU</label>
              <input
                type="text"
                name="cpu"
                value={formData.requirements.cpu}
                onChange={handleRequirementChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900"
                required
              />
            </div>
          </div>
        </div>

        {/* Enlace de descarga */}
        <div>
          <label htmlFor="downloadLink" className="block text-sm font-medium text-gray-700">Enlace de descarga</label>
          <input
            type="url"
            name="downloadLink"
            value={formData.downloadLink}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900"
            required
          />
        </div>

        {/* Botón de guardar */}
        <div className="mt-6 text-center">
          <button
            type="submit"
            className="w-full py-2 px-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
          >
            {selectedGame ? 'Actualizar Juego' : 'Agregar Juego'}
          </button>
        </div>
      </form>

      {/* Listado de Juegos */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Juegos Existentes</h2>
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Título</th>
              <th className="py-2 px-4 border-b">Género</th>
              <th className="py-2 px-4 border-b">Año</th>
              <th className="py-2 px-4 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game._id}>
                <td className="py-2 px-4 border-b">{game.title}</td>
                <td className="py-2 px-4 border-b">{game.genre}</td>
                <td className="py-2 px-4 border-b">{game.releaseYear}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleEdit(game)}
                    className="px-4 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(game._id)}
                    className="ml-2 px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
