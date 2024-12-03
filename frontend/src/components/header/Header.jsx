import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Función para verificar la autenticación
  const checkAuthStatus = () => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token); // Si existe el token, el usuario está autenticado
  };

  // Efecto para verificar si hay un token al montar el componente
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Efecto para escuchar cambios en el localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate(`/search?search=${searchTerm}`);
      setSearchTerm(''); // Limpia el input después de la búsqueda
    }
  };

  const handleCategoryClick = () => {
    setDropdownOpen(false); // Cierra el menú al seleccionar una categoría
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Eliminar el token
    setIsAuthenticated(false); // Actualiza el estado de autenticación
    navigate('/login'); // Redirigir a la página de login
  };

  return (
    <header className="bg-blue-700 text-white p-4 flex justify-between items-center">
      <h1 className="text-3xl font-bold">Juegos Emu</h1>
      
      <nav className='flex flex-row gap-4 justify-center items-center'>
        <ul className="flex gap-6 items-center">
          {/* Links principales */}
          <li>
            <NavLink to="/" className="hover:text-gray-200">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/gameList" className="hover:text-gray-200">
              Juegos
            </NavLink>
          </li>
          <li>
            <NavLink to="/developers" className="hover:text-gray-200">
              Desarrolladores
            </NavLink>
          </li>

          {/* Menú desplegable de categorías */}
          <li className="relative">
            <button
              onClick={toggleDropdown}
              className="hover:text-gray-200 flex items-center"
            >
              Categorías
              <svg
                className="w-4 h-4 ml-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <ul className="absolute top-full left-0 mt-2 w-48 bg-blue-800 text-white rounded-md shadow-lg z-10">
                {[
                  'Acción', 'Aventura', 'RPG', 'Deportes', 'Horror', 'FPS', 'Multiplayer',
                  'Open World', 'Racing', 'Shooters', 'Simulation', 'Strategy', 'Virtual Reality',
                ].map((category) => (
                  <li key={category} className="hover:bg-blue-600">
                    <NavLink
                      to={`/category/${category}`}
                      className="block px-4 py-2"
                      onClick={handleCategoryClick} // Cierra el dropdown al hacer clic en la categoría
                    >
                      {category}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Buscador */}
          <li>
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar juegos..."
                className="px-2 py-1 rounded-l-md text-black"
              />
              <button
                type="submit"
                className="bg-blue-600 px-3 py-1 rounded-r-md hover:bg-blue-500"
              >
                Buscar
              </button>
            </form>
          </li>
        </ul>

        <div className="btns">
          {/* Mostrar los botones según el estado de autenticación */}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded-md text-white hover:bg-red-700"
            >
              Cerrar sesión
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-500"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="bg-green-600 px-4 py-2 rounded-md text-white hover:bg-green-500 ml-4"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
