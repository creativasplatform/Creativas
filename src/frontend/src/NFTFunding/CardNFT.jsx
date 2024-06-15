import React from 'react';
import Prueba from '../assets/Prueba.png';

const Card = ({ title, description, image }) => {
  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-lg  w-96 h-72">
      <img src={Prueba} alt={title} className="w-full h-48 object-cover rounded-t-lg" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

export default Card;
