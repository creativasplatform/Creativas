import React from 'react';
import Prueba from '../assets/Prueba.png';

const Card = ({ title, description, image }) => {
  return (
<div className="bg-gradient-to-c-custom text-white rounded-xl shadow-lg w-96 h-72">
      <img src={Prueba} alt={title} className="w-[360px] mt-2 h-48 object-cover rounded-xl" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

export default Card;
