import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Emu Zone</h1>
      <ul>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/games">Lista de Juegos</Link>
        </li>
        <li>
          <Link to="/add-game">Agregar Juego</Link>
        </li>
        <li>
          <Link to="/edit-games">Editar Juegos</Link>
        </li>
        <li>
          <Link to="/developers">Developers</Link>
        </li>
        <li>
          <Link to="/login" className='login-link'>Iniciar Sesión</Link>
        </li>
        <li>
          <Link to="/register" className='register-link'>Registrarse</Link> 
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

