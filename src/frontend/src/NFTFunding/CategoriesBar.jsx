// src/components/CategoriesBar.jsx
import React from 'react';

const categories = [
  'All', 'Technology', 'Gaming', 'Music', 'Movies', 'Art'

];

const CategoriesBar = () => {
  return (
    <div className="bg-[#0b0c0c] text-[#9398A7] text-lg p-4">
      <div className="flex space-x-8 ml-4 overflow-x-auto">
        {categories.map((category, index) => (
          <button 
            key={index}
            className={`px-4 py-2 whitespace-nowrap ${
              category === 'All' ? 'border-b-2 border-secondary' : ''
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoriesBar;
