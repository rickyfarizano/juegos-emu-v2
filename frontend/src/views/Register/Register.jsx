import React, { useState } from 'react';
import axios from 'axios'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users', formData);

      if (response.status === 201) {
        alert(response.data.message); // Mensaje de éxito
      }
    } catch (error) {
      if (error.response) {
        // Error desde el servidor
        alert(error.response.data.message || 'Error al registrar el usuario.');
      } else {
        // Error general
        console.error('Error:', error);
        alert('No se pudo conectar al servidor.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-700 text-center">Registrarse</h2>
      <div className="mt-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-600">Nombre de Usuario</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Tu nombre de usuario"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mt-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email de Usuario</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Tu correo"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mt-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-600">Contraseña</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Tu contraseña"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-6 hover:bg-blue-700">
        Registrarse
      </button>
    </form>
  );
};

export default Register;