import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { email, password } = formData;

    if (!email) {
      setErrorMessage('El campo de correo no puede estar vacío.');
      return false;
    }
    if (!password) {
      setErrorMessage('El campo de contraseña no puede estar vacío.');
      return false;
    }

    setErrorMessage(''); // Limpiar mensajes de error si las validaciones pasan
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Detener si el formulario no es válido
    }

    try {
      // Supongamos que el endpoint para login es '/api/login'
      const response = await axios.post('http://localhost:5000/api/users/login', formData);

      if (response.status === 200) {
        setSuccessMessage('¡Inicio de sesión exitoso!');
        setErrorMessage('');
      }
    } catch (error) {
      setSuccessMessage('');
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Error al iniciar sesión.');
      } else {
        setErrorMessage('No se pudo conectar al servidor.');
      }
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
