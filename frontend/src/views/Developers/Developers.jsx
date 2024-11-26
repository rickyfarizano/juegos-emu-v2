import React, { useState, useEffect } from 'react';
import { useDeveloperContext } from '../../context/DeveloperContext'; // Importar el hook del contexto de desarrolladoras

const DeveloperList = () => {
  const { developers } = useDeveloperContext(); // Acceder al estado de desarrolladoras desde el contexto
  const [developerList, setDeveloperList] = useState([]);

  useEffect(() => {
    setDeveloperList(developers); // Actualizar el estado local cuando cambien las desarrolladoras
  }, [developers]);

  return (
    <div className="grid grid-cols-4 gap-4">
      {developerList.map((developer, index) => (
        <div key={index} className="border p-4">
          <h3>{developer.name}</h3>
          <p>founded: {developer.founded}</p>
          <p>País: {developer.country}</p>
        </div>
      ))}
    </div>
  );
};

export default DeveloperList;