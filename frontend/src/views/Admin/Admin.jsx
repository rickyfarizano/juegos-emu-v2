import React, { useState, useEffect } from 'react';
import { useDeveloperContext } from '../../context/DeveloperContext';
import { useAuth } from '../../context/AuthContext';
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

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const validateForm = () => {
    const {
      title,
      genre,
      releaseYear,
      weight,
      developer,
      description,
      requirements,
    } = formData;
  
    const newErrors = {};
  
    if (!title) {
      newErrors.title = 'El campo título no puede estar vacío.';
    }
    if (!genre) {
      newErrors.genre = 'El campo género no puede estar vacío.';
    }
    if (!releaseYear) {
      newErrors.releaseYear = 'El campo año de lanzamiento no puede estar vacío.';
    }
    if (!weight) {
      newErrors.weight = 'El campo peso no puede estar vacío.';
    }
    if (!developer) {
      newErrors.developer = 'El campo desarrollador no puede estar vacío.';
    }
    if (!description) {
      newErrors.description = 'El campo descripción no puede estar vacío.';
    }
    if (!requirements.gpu || !requirements.ram || !requirements.cpu) {
      newErrors.requirements = 'Todos los campos de requerimientos del sistema son obligatorios.';
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
  
    setErrors({});
    return true;
  };

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

    if (!validateForm()) {
      return;
    }

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

      if (!response.ok) throw new Error('Error en la solicitud');

      const data = await response.json();

      if (selectedGame) {
        setGames((prevGames) =>
          prevGames.map((game) => (game._id === data._id ? data : game))
        );
      } else {
        setGames((prevGames) => [...prevGames, data]);
      }

      resetForm();
      setSuccessMessage(selectedGame ? 'Juego actualizado con éxito' : 'Juego agregado con éxito');
      setErrorMessage(''); // Limpiar mensaje de error
    } catch (error) {
      setSuccessMessage(''); // Limpiar mensaje de éxito
      setErrorMessage('Error al enviar los datos del juego: ' + error.message);
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

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6 bg-white shadow-md rounded-md p-6">
        <h2 className="text-2xl font-bold mb-4">{selectedGame ? 'Editar Juego' : 'Agregar Juego'}</h2>

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
              <option key={dev._id} value={dev.name}>
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
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows="3"
            required
          />
        </div>

        {/* Requisitos */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <label htmlFor="requirements.gpu" className="block text-sm font-medium text-gray-700">Requisito GPU</label>
            <input
              type="text"
              name="gpu"
              value={formData.requirements.gpu}
              onChange={handleRequirementChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="requirements.ram" className="block text-sm font-medium text-gray-700">Requisito RAM</label>
            <input
              type="text"
              name="ram"
              value={formData.requirements.ram}
              onChange={handleRequirementChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="requirements.cpu" className="block text-sm font-medium text-gray-700">Requisito CPU</label>
            <input
              type="text"
              name="cpu"
              value={formData.requirements.cpu}
              onChange={handleRequirementChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Enlace de descarga */}
        <div>
          <label htmlFor="downloadLink" className="block text-sm font-medium text-gray-700">Enlace de descarga</label>
          <input
            type="text"
            name="downloadLink"
            value={formData.downloadLink}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Galería */}
        <div>
          <label htmlFor="gallery" className="block text-sm font-medium text-gray-700">Galería</label>
          <input
            type="file"
            name="gallery"
            accept="image/*"
            multiple
            onChange={(e) => handleFileChange(e, 'gallery')}
            className="mt-1 block w-full text-gray-900"
          />
        </div>

        {/* Imagen principal */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Imagen principal</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'image')}
            className="mt-1 block w-full text-gray-900"
          />
        </div>

        <div className="flex justify-center gap-4">
          <button
            type="submit"
            className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {selectedGame ? 'Guardar cambios' : 'Agregar juego'}
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="w-1/2 bg-gray-300 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Limpiar formulario
          </button>
        </div>

        <div className="mt-6">
          {errorMessage && <div className="bg-red-500 text-white p-4 rounded mb-4">{errorMessage}</div>}
          {successMessage && <div className="bg-green-500 text-white p-4 rounded mb-4">{successMessage}</div>}
        </div>
        
      </form>

      {/* Tabla de juegos */}
      <div className="overflow-x-auto mt-8">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Título</th>
              <th className="px-4 py-2 border">Género</th>
              <th className="px-4 py-2 border">Año de lanzamiento</th>
              <th className="px-4 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game._id}>
                <td className="px-4 py-2 border">{game.title}</td>
                <td className="px-4 py-2 border">{game.genre}</td>
                <td className="px-4 py-2 border">{game.releaseYear}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleEdit(game)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(game._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
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
