
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const nameRegex = /^[a-zA-Z\s]+$/; // Solo letras y espacios
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validar correo
    const { name, email, password } = formData;

    const validationErrors = [];

    if (!name) {
      validationErrors.push('El nombre no puede estar vacío.');
    } else if (!nameRegex.test(name)) {
      validationErrors.push('El nombre solo puede contener letras.');
    }

    if (!email) {
      validationErrors.push('El campo de correo no puede estar vacío.');
    } else if (!emailRegex.test(email)) {
      validationErrors.push('Por favor, introduce un correo válido.');
    }

    if (!password) {
      validationErrors.push('El campo de contraseña no puede estar vacío.');
    } else if (password.length < 4) {
      validationErrors.push('La contraseña debe tener al menos 4 caracteres.');
    }

    setErrors(validationErrors); // Actualizar la lista de errores
    return validationErrors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Si el formulario no pasa las validaciones, no envía la solicitud
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users', formData);

      if (response.status === 201) {
        setSuccessMessage('¡Usuario registrado exitosamente!');
        setErrors([]); // Limpiar errores
        setFormData({ name: '', email: '', password: '' }); // Limpiar formulario
      }
    } catch (error) {
      setSuccessMessage('');
      const serverError = error.response?.data.message || 'Error a la hora de registrar el usuario.';
      setErrors([serverError]);
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

    {/* mensajes de error */}
    {errors.length > 0 && (
      <ul className="text-red-500 text-center mt-2">
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    )}

    {/* mensajes de exito */}
    {successMessage && (
      <p className="text-green-500 text-center mt-2">{successMessage}</p>
    )}

    <button
      type="submit"
      className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-6 hover:bg-blue-700">
      Registrarse
    </button>
  </form>
  );
};

export default Register;
