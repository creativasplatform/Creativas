// src/NFTFunding/Categories.jsx
import React from 'react';
import Card from './CardNFT';
import CategoriesBar from './CategoriesBar';

const Categories = () => {
  const collections = [
    {
      title: 'Tecate Comuna',
      description: '9.2K items - 10.8K ETH',
      image: 'path_to_image_1.jpg'
    },
    // Añadir más colecciones aquí
  ];

  return (
    <div className="bg-[#0b0c0c] text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Explore collections</h2>
      <CategoriesBar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
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
