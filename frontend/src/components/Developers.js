import React, { useState, useEffect } from 'react';
import './Developers.css'; // Asegúrate de importar el archivo CSS

const Developers = () => {
  const [name, setName] = useState('');
  const [founded, setFounded] = useState('');
  const [country, setCountry] = useState('');
  const [developers, setDevelopers] = useState([]);
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);
  const [editName, setEditName] = useState('');
  const [editFounded, setEditFounded] = useState('');
  const [editCountry, setEditCountry] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/developers');
        if (!response.ok) {
          throw new Error('Error al traer los desarrolladores');
        }
        const data = await response.json();
        setDevelopers(data);
      } catch (error) {
        console.error(error);
        setErrorMessage(error.message);
      }
    };

    fetchDevelopers();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !country) {
      setErrorMessage('Por favor, completa todos los campos obligatorios.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/developers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, founded, country }),
      });

      if (!response.ok) {
        throw new Error('Error al registrar el desarrollador');
      }

      const newDeveloper = await response.json();
      setDevelopers((prev) => [...prev, newDeveloper]);
      setName('');
      setFounded('');
      setCountry('');
      setSuccessMessage('Desarrollador registrado exitosamente!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  const handleDelete = async () => {
    if (!selectedDeveloper) return;

    try {
      const response = await fetch(`http://localhost:5000/api/developers/${selectedDeveloper}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setDevelopers(developers.filter(dev => dev.name !== selectedDeveloper));
        setSuccessMessage('Desarrollador borrado exitosamente!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        const errorData = await response.json();
        console.error('Error al borrar el desarrollador:', errorData.message || response.statusText);
        setErrorMessage('Error al borrar el desarrollador: ' + (errorData.message || response.statusText));
      }
    } catch (error) {
      console.error('Error al borrar el desarrollador:', error);
      setErrorMessage('Error al borrar el desarrollador: ' + error.message);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!selectedDeveloper || !editName || !editCountry) {
      setErrorMessage('Por favor, completa todos los campos obligatorios para editar.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/developers/${selectedDeveloper}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editName, founded: editFounded, country: editCountry }),
      });

      if (!response.ok) {
        throw new Error('Error al editar el desarrollador');
      }

      const updatedDeveloper = await response.json();

      setDevelopers(developers.map((dev) => (dev.name === selectedDeveloper ? updatedDeveloper : dev)));

      setEditName('');
      setEditFounded('');
      setEditCountry('');
      setSuccessMessage('Desarrollador editado exitosamente!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

// Dentro del componente DeveloperForm
return (
  <div>
    <h2>Agregar Desarrollador</h2>
    <div className="form-container">
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ingresa el nombre"
            required
          />
        </div>
        <div>
          <label htmlFor="founded">Fundado</label>
          <input
            type="date"
            id="founded"
            value={founded}
            onChange={(e) => setFounded(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="country">País</label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Ingresa el país"
            required
          />
        </div>
        <button type="submit">Agregar</button>
      </form>

      <div>
        <h3>Gestionar Desarrolladores</h3>
        <select
          value={selectedDeveloper || ''}
          onChange={(e) => {
            const developer = developers.find((dev) => dev.name === e.target.value);
            setSelectedDeveloper(developer ? developer.name : null);
            setEditName(developer ? developer.name : '');
            setEditFounded(developer ? developer.founded.split('T')[0] : '');
            setEditCountry(developer ? developer.country : '');
          }}
        >
          <option value="" disabled>Selecciona un desarrollador para gestionar</option>
          {developers.map((dev) => (
            <option key={dev.name} value={dev.name}>
              {dev.name}
            </option>
          ))}
        </select>
        <button onClick={handleDelete} disabled={!selectedDeveloper}>
          Borrar Desarrollador
        </button>
      </div>

      <div>
        <h3>Editar Desarrollador</h3>
        <form onSubmit={handleEdit}>
          <div>
            <label htmlFor="editName">Nombre</label>
            <input
              type="text"
              id="editName"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Edita el nombre"
            />
          </div>
          <div>
            <label htmlFor="editFounded">Fundado</label>
            <input
              type="date"
              id="editFounded"
              value={editFounded}
              onChange={(e) => setEditFounded(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="editCountry">País</label>
            <input
              type="text"
              id="editCountry"
              value={editCountry}
              onChange={(e) => setEditCountry(e.target.value)}
              placeholder="Edita el país"
            />
          </div>
          <button type="submit" disabled={!selectedDeveloper}>
            Actualizar Desarrollador
          </button>
        </form>
      </div>

      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  </div>
);

};

export default Developers;
