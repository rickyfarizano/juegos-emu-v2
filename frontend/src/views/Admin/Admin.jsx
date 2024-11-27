import React, { useState, useEffect } from 'react';

const Admin = () => {
  const [games, setGames] = useState([]); // Aquí almacenamos los juegos
  const [selectedGame, setSelectedGame] = useState(null); // Juego seleccionado para editar

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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedGame) {
      // Si hay un juego seleccionado, lo actualizamos
      const updatedGames = games.map((game) =>
        game.id === selectedGame.id ? { ...formData, id: game.id } : game
      );
      setGames(updatedGames);
    } else {
      // Si no hay juego seleccionado, lo agregamos con un id único
      setGames([...games, { ...formData, id: Date.now() }]);
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
  };

  // Maneja la eliminación de un juego
  const handleDelete = (gameId) => {
    const updatedGames = games.filter((game) => game.id !== gameId);
    setGames(updatedGames);
  };

  // Maneja la edición de un juego (rellena el formulario)
  const handleEdit = (game) => {
    setSelectedGame(game); // Establecer juego seleccionado para editar
    setFormData(game); // Rellenar los campos con los datos del juego
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
            required
          />
        </div>

        {/* Botones de acción */}
        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
          >
            {selectedGame ? 'Actualizar Juego' : 'Agregar Juego'}
          </button>
          {selectedGame && (
            <button
              type="button"
              onClick={() => handleDelete(selectedGame.id)}
              className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
            >
              Eliminar Juego
            </button>
          )}
        </div>
      </form>

      {/* Lista de juegos */}
      <div className="mt-8">
        <h2 className="text-2xl mb-4">Lista de Juegos</h2>
        <ul>
          {games.map((game) => (
            <li key={game.id} className="flex justify-between items-center mb-4">
              <span>{game.title}</span>
              <div>
                <button
                  onClick={() => handleEdit(game)}
                  className="bg-blue-600 text-white py-1 px-3 rounded-md mr-2 hover:bg-blue-700"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(game.id)}
                  className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;