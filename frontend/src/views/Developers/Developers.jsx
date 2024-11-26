import React, { useState, useEffect } from 'react';
import { useDeveloperContext } from '../../context/DeveloperContext'; // Importar el hook del contexto de desarrolladoras

const DeveloperList = () => {
  const { developers } = useDeveloperContext(); // Acceder al estado de desarrolladoras desde el contexto
  const [developerList, setDeveloperList] = useState([]);

  useEffect(() => {
    setDeveloperList(developers); // Actualizar el estado local cuando cambien las desarrolladoras
  }, [developers]);

  return (
    <div className="flex">


      <div className="developer flex gap-4  justify-center flex-col">
        {developerList.map((developer, index) => (
          <div key={index} className="p-4 border bg-blue-700">
            <h3 className='text-white'>{developer.name}</h3>
            <p className='text-white'>founded: {developer.founded}</p>
            <p className='text-white'>País: {developer.country}</p>
          </div>

          // aca  va a ir el componente de carousel para cada juego
        ))}
      </div>
    </div>
  );
};

export default DeveloperList;