import React, { useState, useEffect } from 'react';
import { useDeveloperContext } from '../../context/DeveloperContext'; // Importar el hook del contexto de desarrolladoras

const DeveloperList = () => {
  const { developers } = useDeveloperContext(); // Acceder al estado de desarrolladoras desde el contexto
  const [developerList, setDeveloperList] = useState([]);

  useEffect(() => {
    setDeveloperList(developers); // Actualizar el estado local cuando cambien las desarrolladoras
  }, [developers]);

  return (
    <div className="w-100">


      <div className="developer w-100 flex justify-center flex-col">
        {developerList.map((developer, index) => (
          <div key={index} className="w-500 p-4 m-4 border bg-blue-900">
            <h3 className='text-2xl text-white font-bold text-center'>{developer.name}</h3>
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