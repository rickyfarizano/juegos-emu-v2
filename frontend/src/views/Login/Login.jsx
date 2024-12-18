

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { email, password } = formData;
    if (!email || !password) {
      setErrorMessage('Correo y contraseña son obligatorios.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', formData);
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        setSuccessMessage('Inicio de sesión exitoso!');
        navigate('/');  // Redirigir al dashboard o ruta protegida
      }
    } catch (error) {
      setErrorMessage(error.response?.data.message || 'Error al iniciar sesión');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold text-gray-700 text-center">Inicio de Sesión</h2>

    <div className="mt-4">
      <label htmlFor="email-login" className="block text-sm font-medium text-gray-600">Correo Electrónico</label>
      <input
        type="email"
        id="email-login"
        name="email"
        placeholder="Tu correo"
        value={formData.email}
        onChange={handleChange}
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div className="mt-4">
      <label htmlFor="password-login" className="block text-sm font-medium text-gray-600">Contraseña</label>
      <input
        type="password"
        id="password-login"
        name="password"
        placeholder="Tu contraseña"
        value={formData.password}
        onChange={handleChange}
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    {errorMessage && (
      <p className="text-red-500 text-center mt-2">{errorMessage}</p>
    )}
    {successMessage && (
      <p className="text-green-500 text-center mt-2">{successMessage}</p>
    )}

    <button
      type="submit"
      className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-6 hover:bg-blue-700">
      Iniciar Sesión
    </button>
  </form>
  );
};

export default Login;
