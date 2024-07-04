import React from 'react';

const categories = [
  'All', 'Technology', 'Gaming', 'Music', 'Movies', 'Art'
];

const CategoriesBar = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="bg-[#0b0c0c] text-[#9398A7] text-lg p-4">
      <div className="flex space-x-8 ml-4 overflow-x-auto">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 whitespace-nowrap ${
              category === selectedCategory ? 'border-b-2 border-secondary text-white' : ''
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
