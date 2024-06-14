// src/components/Card.jsx
import React from 'react';

const Card = ({ title, description, image }) => {
  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-lg p-4">
      <img src={image} alt={title} className="w-full h-32 object-cover rounded-t-lg" />
      <div className="p-2">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

export default Card;
