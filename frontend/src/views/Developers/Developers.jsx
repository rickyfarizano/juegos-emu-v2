import React, { useState, useEffect } from 'react';
import { useDeveloperContext } from '../../context/DeveloperContext'; // Importar el hook del contexto de desarrolladoras
import { Link } from 'react-router-dom';

const DeveloperList = () => {
  const { developers } = useDeveloperContext(); // Acceder al estado de desarrolladoras desde el contexto
  const [developerList, setDeveloperList] = useState([]);

  useEffect(() => {
    setDeveloperList(developers); // Actualizar el estado local cuando cambien las desarrolladoras
  }, [developers]);

  return (
    <div className="w-100">


      <div className="developer grid grid-cols-4  justify-center flex-row">
        {developerList.map((developer, index) => (
          <div key={index} className="w-500 p-4 m-4 border bg-blue-900">
            <h3 className='text-2xl text-white font-bold text-center'>{developer.name}</h3>
            <p className='text-white'>founded: {developer.founded}</p>
            <p className='text-white'>País: {developer.country}</p>
            <div className="w-100 btn-ver-mas flex justify-center items-center mt-2">
              <Link className='text-center text-white bg-green-600  p-1 rounded' to={ `/developers/developerDetails/${developer._id}`}>Ver mas</Link>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default DeveloperList;