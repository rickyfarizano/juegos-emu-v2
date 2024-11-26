import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const DeveloperContext = createContext();

export const DeveloperProvider = ({ children }) => {
  const [developers, setDevelopers] = useState([]);

  // Cargar desarrolladoras desde MongoDB al montar el componente
  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/developers'); // Reemplaza con tu endpoint real
        setDevelopers(response.data); // Actualizar el estado con las desarrolladoras obtenidas
      } catch (error) {
        console.error('Error fetching developers:', error);
      }
    };

    fetchDevelopers();
  }, []);

  // Método para agregar una desarrolladora
  const addDeveloper = async (developer) => {
    try {
      const response = await axios.post('http://localhost:5000/api/developers', developer); // Reemplaza con tu lógica de backend
      setDevelopers((prevDevelopers) => [...prevDevelopers, response.data]); // Actualizar el estado con la nueva desarrolladora
    } catch (error) {
      console.error('Error adding developer:', error);
    }
  };

  return (
    <DeveloperContext.Provider value={{ developers, addDeveloper }}>
      {children}
    </DeveloperContext.Provider>
  );
};

// Hook para acceder al contexto
export const useDeveloperContext = () => {
  return useContext(DeveloperContext);
};
