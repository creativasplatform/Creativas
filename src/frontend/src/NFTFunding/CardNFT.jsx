import React from 'react';

const CardNFT = ({ title, description, image, className, style }) => {
  return (
    <div className={`bg-gradient-to-c-custom text-white rounded-xl shadow-lg w-80 h-72 mb-4 ${className}`} style={style}>
      <img src={image} alt={title} className="w-[300px] mt-2 h-48 object-cover rounded-xl" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

export default CardNFT;
