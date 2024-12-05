import React, { useState, useEffect } from 'react';
import { useDeveloperContext } from '../../context/DeveloperContext';
import { Link } from 'react-router-dom';

const DeveloperList = () => {
  const { developers } = useDeveloperContext();
  const [developerList, setDeveloperList] = useState([]);

  useEffect(() => {
    setDeveloperList(developers);
  }, [developers]);

  return (
    <div className="min-h-screen flex flex-col items-start p-4">
      <h1 className="text-3xl font-bold text-blue-700 text-center mb-4">Lista de Desarrolladores</h1>
      
      <div className="flex flex-wrap justify-start gap-4 w-full mt-4">
        {developerList.map((developer, index) => (
          <div key={index} className="transition-opacity duration-500 opacity-100 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4 m-4 border bg-blue-900">
            <h3 className="text-2xl text-white font-bold text-center">{developer.name}</h3>
            <p className="text-white">Fundado: {developer.founded}</p>
            <p className="text-white">País: {developer.country}</p>
            <div className="w-full btn-ver-mas flex justify-center items-center mt-2">
              <Link className="text-center text-white bg-green-600 p-1 rounded" to={`/developers/developerDetails/${developer._id}`}>
                Ver más
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeveloperList;