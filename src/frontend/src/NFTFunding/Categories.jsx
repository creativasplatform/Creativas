import React from 'react';
import Card from './CardNFT';
import CategoriesBar from './CategoriesBar';
import masicon from "../assets/mas.png"; // Importa el icono aquí

const Categories = ({onOpenModal}) => {
  const collections = [
    {
      title: 'Tecate Comuna',
      description: '9.2K items - 10.8K ETH',
    },
    {
      title: 'Tecate Comuna',
      description: '9.2K items - 10.8K ETH',
    },
    
    {
      title: 'Tecate Comuna',
      description: '9.2K items - 10.8K ETH',
    },
    
    {
      title: 'Tecate Comuna',
      description: '9.2K items - 10.8K ETH',
    },
        {
      title: 'Tecate Comuna',
      description: '9.2K items - 10.8K ETH',
    },
    
    


    // Otros elementos de colección pueden ir aquí si los tienes
  ];

  return (
    <div className="bg-[#0b0c0c] text-white p-4">
      <div className="flex items-center justify-between">
        {/* Título "Explore collections" a la izquierda con tipografía semibold */}
        <h2 className="text-5xl font-semibold mb-4 mt-8 ml-8">Explore Projects</h2>

        {/* Botón "Create a Project" con el icono al lado y tipografía thin */}
        <div className="flex items-center">
          <button
          onClick={onOpenModal}
            type="button"
            className="mr-32 text-white bg-secondary hover:bg-secondary-ligth focus:outline-none font-thin rounded-full text-lg px-5 py-2.5 text-center md:text-left dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center"
          >
            <img src={masicon} className="h-4 w-4 mr-2" alt="Add Icon" /> {/* Añade margen a la derecha del icono */}
            Create a Project
          </button>
        </div>
      </div>
      
      <CategoriesBar />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {collections.map((collection, index) => (
          <Card
            key={index}
            title={collection.title}
            description={collection.description}
            image={collection.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
