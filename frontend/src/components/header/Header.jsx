import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <NavLink to="/" className="hover:text-gray-400">
              Juegos Emu
            </NavLink>
          </div>

          {/* Icono de menú para dispositivos móviles */}
          <button
            className="text-white md:hidden focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>

          {/* Menú */}
          <ul
            className={`flex flex-col md:flex-row md:space-x-6 absolute md:static bg-blue-700 md:bg-transparent w-full md:w-auto left-0 top-16 md:top-0 transition-transform duration-300 ease-in-out ${
              isMenuOpen ? 'translate-y-0' : '-translate-y-full md:translate-y-0'
            }`}
          >
            <li className="border-b md:border-none">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? 'text-blue-400 font-semibold block py-2 md:py-0'
                    : 'hover:text-gray-400 block py-2 md:py-0'
                }
              >
                Home
              </NavLink>
            </li>
            <li className="border-b md:border-none">
              <NavLink
                to="/gameList"
                className={({ isActive }) =>
                  isActive
                    ? 'text-blue-400 font-semibold block py-2 md:py-0'
                    : 'hover:text-gray-400 block py-2 md:py-0'
                }
              >
                Games
              </NavLink>
            </li>
            <li className="border-b md:border-none">
              <NavLink
                to="/developers"
                className={({ isActive }) =>
                  isActive
                    ? 'text-blue-400 font-semibold block py-2 md:py-0'
                    : 'hover:text-gray-400 block py-2 md:py-0'
                }
              >
                Developers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categories"
                className={({ isActive }) =>
                  isActive
                    ? 'text-blue-400 font-semibold block py-2 md:py-0'
                    : 'hover:text-gray-400 block py-2 md:py-0'
                }
              >
                Categories
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
