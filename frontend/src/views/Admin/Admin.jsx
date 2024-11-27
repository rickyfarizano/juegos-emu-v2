import React, { useState, useEffect } from 'react';

const Admin = () => {
  const [games, setGames] = useState([]); // Aquí almacenamos los juegos
  const [selectedGame, setSelectedGame] = useState(null); // Juego seleccionado para editar
  const [inputValue, setInputValue] = useState('');

  // Estado para el formulario
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

  // Recuperamos los juegos desde el localStorage cuando el componente se monta
  useEffect(() => {
    const savedGames = JSON.parse(localStorage.getItem('games')) || [];
    setGames(savedGames);
  
    // Si tienes un backend, también puedes hacer una solicitud para obtener los juegos
    const fetchGames = async () => {
      const response = await fetch('http://localhost:5000/api/games');
      const data = await response.json();
      setGames(data);
    };
  
    fetchGames();
  }, []);

  // Guardamos los juegos en localStorage cada vez que la lista cambie
  useEffect(() => {
    if (games.length > 0) {
      localStorage.setItem('games', JSON.stringify(games));
    } else {
      localStorage.removeItem('games'); // Limpiar si no hay juegos
    }
  }, [games]);

  // Maneja los cambios de entrada
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Maneja el cambio de archivos
  const handleFileChange = (e, field) => {
    if (field === 'gallery') {
      setFormData({ ...formData, gallery: Array.from(e.target.files) });
    } else {
      setFormData({ ...formData, [field]: e.target.files[0] });
    }
  };

  // Maneja los cambios en los requisitos del juego
  const handleRequirementChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      requirements: { ...formData.requirements, [name]: value },
    });
  };

  // Maneja el envío del formulario (Agregar/Editar juego)
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validación del campo releaseYear
    if (isNaN(formData.releaseYear) || formData.releaseYear.trim() === '') {
      alert('Por favor, ingresa un año de lanzamiento válido.');
      return;
    }
  
    // Convertir releaseYear a número (si es necesario)
    const releaseYear = parseInt(formData.releaseYear, 10);
  
    // Crear un objeto gameData con el año como número
    const gameData = { ...formData, releaseYear: releaseYear };
  
    try {
      if (selectedGame) {
        // Actualizar el juego
        const response = await fetch(`http://localhost:5000/api/games/${selectedGame.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(gameData),
        });
        const updatedGame = await response.json();
        setGames((prevGames) => prevGames.map((game) => (game.id === updatedGame.id ? updatedGame : game)));
      } else {
        // Crear un nuevo juego
        const response = await fetch('http://localhost:5000/api/games', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(gameData),
        });
        const newGame = await response.json();
        setGames([...games, newGame]);
      }
      setSelectedGame(null); // Limpiar después de agregar/editar
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
      }); // Limpiar el formulario
    } catch (error) {
      console.error('Error al enviar los datos del juego:', error);
    }
  };
  

  // Maneja la eliminación de un juego
  const handleDelete = (gameId) => {
    const updatedGames = games.filter((game) => game.id !== gameId);
    setGames(updatedGames);
  };

  // Maneja la edición de un juego (rellena el formulario)
  const handleEdit = (game) => {
    setSelectedGame(game); // Establecer juego seleccionado para editar
    setFormData({
      title: game.title || '',
      genre: game.genre || '',
      releaseYear: game.releaseYear || '',
      weight: game.weight || '',
      image: game.image || null,
      developer: game.developer || '',
      description: game.description || '',
      youtubeUrl: game.youtubeUrl || '',
      gallery: game.gallery || [],
      requirements: game.requirements || { gpu: '', ram: '', cpu: '' },
      downloadLink: game.downloadLink || '',
    }); // Rellenar los campos con los datos del juego
  };

  return (
    <div className="admin-container">
      <h1 className="text-3xl mb-4 text-center text-white font-bold mt-4">Gestión de Juegos</h1>

      {/* Formulario de juego */}
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6 bg-white shadow-md rounded-md p-6">
        <h2 className="text-2xl font-bold mb-4">{selectedGame ? 'Editar Juego' : 'Agregar Juego'}</h2>

        {/* Título */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Título
          </label>
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
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
            Género
          </label>
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
          <label htmlFor="releaseYear" className="block text-sm font-medium text-gray-700">
            Año de lanzamiento
          </label>
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
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
            Peso (en GB)
          </label>
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
          <label htmlFor="developer" className="block text-sm font-medium text-gray-700">
            Desarrollador
          </label>
          <input
            type="text"
            name="developer"
            value={formData.developer}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Imagen */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Imagen
          </label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, 'image')}
            accept="image/*"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* URL de YouTube */}
        <div>
          <label htmlFor="youtubeUrl" className="block text-sm font-medium text-gray-700">
            URL de YouTube
          </label>
          <input
            type="url"
            name="youtubeUrl"
            value={formData.youtubeUrl}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Descripción */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Descripción
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Requisitos */}
        <div>
          <h3 className="text-lg font-medium text-gray-700">Requisitos</h3>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <div>
              <label htmlFor="gpu" className="block text-sm font-medium text-gray-700">
                GPU
              </label>
              <input
                type="text"
                name="gpu"
                value={formData.requirements.gpu}
                onChange={handleRequirementChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="ram" className="block text-sm font-medium text-gray-700">
                RAM
              </label>
              <input
                type="text"
                name="ram"
                value={formData.requirements.ram}
                onChange={handleRequirementChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="cpu" className="block text-sm font-medium text-gray-700">
                CPU
              </label>
              <input
                type="text"
                name="cpu"
                value={formData.requirements.cpu}
                onChange={handleRequirementChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Enlace de descarga */}
        <div>
          <label htmlFor="downloadLink" className="block text-sm font-medium text-gray-700">
            Enlace de Descarga
          </label>
          <input
            type="url"
            name="downloadLink"
            value={formData.downloadLink}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mt-4 flex justify-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-700"
          >
            {selectedGame ? 'Actualizar Juego' : 'Agregar Juego'}
          </button>
        </div>
      </form>

      {/* Listado de juegos */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Juegos Agregados</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {games.map((game) => (
            <div
              key={game.id}
              className="border border-gray-300 p-4 rounded-md shadow-sm"
            >
              <h3 className="text-lg font-semibold">{game.title}</h3>
              <p>{game.genre}</p>
              <div className="flex justify-between mt-2">
                <button
                  onClick={() => handleEdit(game)}
                  className="px-2 py-1 text-white bg-yellow-500 rounded-md hover:bg-yellow-700"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(game.id)}
                  className="px-2 py-1 text-white bg-red-500 rounded-md hover:bg-red-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
