import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo o Nombre */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold">Juegos Emu</h2>
          <p className="text-sm text-gray-400">Tu sitio web de videojuegos</p>
        </div>

        {/* Enlaces de Navegación */}
        <nav className="flex justify-between items-center">

          {/* Icono de menú para dispositivos móviles */}
          <button
            className="text-white md:hidden focus:outline-none"
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
            className={`flex flex-col md:flex-row md:space-x-6 absolute md:static bg-blue-700 md:bg-transparent w-full md:w-auto left-0 top-16 md:top-0 transition-transform duration-300 ease-in-out`}
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

        {/* Redes Sociales */}
        <div className="flex space-x-6">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M24 4.557a9.83 9.83 0 0 1-2.828.775A4.932 4.932 0 0 0 23.337 3c-.964.571-2.032.986-3.127 1.21A4.918 4.918 0 0 0 16.616 3c-2.736 0-4.953 2.228-4.953 4.978 0 .39.042.765.127 1.124C7.728 8.84 4.1 7.13 1.671 4.149a4.935 4.935 0 0 0-.67 2.5c0 1.722.866 3.242 2.181 4.134a4.904 4.904 0 0 1-2.247-.623v.064c0 2.406 1.693 4.414 3.946 4.867a4.937 4.937 0 0 1-2.24.086c.63 1.968 2.46 3.398 4.623 3.44a9.866 9.866 0 0 1-6.105 2.104c-.396 0-.785-.023-1.169-.067A13.914 13.914 0 0 0 7.548 21c9.142 0 14.307-7.721 14.307-14.426 0-.22-.005-.438-.014-.656A10.217 10.217 0 0 0 24 4.557z" />
            </svg>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.325v21.351c0 .733.592 1.325 1.325 1.325h11.494v-9.285h-3.126v-3.622h3.126v-2.672c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.464.099 2.794.143v3.24l-1.917.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.59l-.467 3.622h-3.122v9.285h6.116c.733 0 1.325-.592 1.325-1.325v-21.351c0-.733-.592-1.325-1.325-1.325z" />
            </svg>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.056 1.97.24 2.422.402a4.8 4.8 0 0 1 1.675 1.091 4.802 4.802 0 0 1 1.091 1.675c.163.452.346 1.253.402 2.422.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.402 2.422a4.798 4.798 0 0 1-1.091 1.675 4.796 4.796 0 0 1-1.675 1.091c-.452.163-1.253.346-2.422.402-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.422-.402a4.798 4.798 0 0 1-1.675-1.091 4.802 4.802 0 0 1-1.091-1.675c-.163-.452-.346-1.253-.402-2.422-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.056-1.17.24-1.97.402-2.422a4.798 4.798 0 0 1 1.091-1.675 4.8 4.8 0 0 1 1.675-1.091c.452-.163 1.253-.346 2.422-.402 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.257 0-3.667.014-4.947.072-1.281.058-2.166.248-2.913.53a6.574 6.574 0 0 0-2.393 1.562 6.582 6.582 0 0 0-1.562 2.393c-.282.747-.472 1.632-.53 2.913-.058 1.281-.072 1.691-.072 4.947s.014 3.667.072 4.947c.058 1.281.248 2.166.53 2.913a6.582 6.582 0 0 0 1.562 2.393 6.574 6.574 0 0 0 2.393 1.562c.747.282 1.632.472 2.913.53 1.281.058 1.691.072 4.947.072s3.667-.014 4.947-.072c1.281-.058 2.166-.248 2.913-.53a6.573 6.573 0 0 0 2.393-1.562 6.573 6.573 0 0 0 1.562-2.393c.282-.747.472-1.632.53-2.913.058-1.281.072-1.691.072-4.947s-.014-3.667-.072-4.947c-.058-1.281-.248-2.166-.53-2.913a6.573 6.573 0 0 0-1.562-2.393 6.574 6.574 0 0 0-2.393-1.562c-.747-.282-1.632-.472-2.913-.53-1.281-.058-1.691-.072-4.947-.072zm0 7.175c-2.661 0-4.825 2.164-4.825 4.825s2.164 4.825 4.825 4.825 4.825-2.164 4.825-4.825-2.164-4.825-4.825-4.825zm0 2.163a2.663 2.663 0 1 1 0 5.326 2.663 2.663 0 0 1 0-5.326z" />
            </svg>
          </a>
        </div>
      </div>
      <div className="text-center text-sm text-gray-400 mt-4">
        <p>&copy; {new Date().getFullYear()} Juegos Emu. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
