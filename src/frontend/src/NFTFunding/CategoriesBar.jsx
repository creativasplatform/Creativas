import React from 'react';
import {Select, SelectItem} from "@nextui-org/react";

const categories = [
  'All', 'Technology', 'Gaming', 'Music', 'Movies', 'Art'
];


export const options = [
  {key: "Started", label: "Live now"},
  {key: "Funded", label: "Fully Funded"},
  {key: "Failed", label: "Projects Failed"},
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

     <Select 
      items={options}
      size='sm'
      color='default'
      label="Sort by"
      placeholder="Live now"
      variant="bordered"
      radius='lg'
      classNames={{
        listboxWrapper: "max-h-[400px]",
        base: "font-roboto"
      }}
      listboxProps={{
        itemClasses: {
          base: [
            "font-roboto",
            "rounded-full",
            "text-[#9398A7]",
            "transition-opacity",
             "outline-none",
            "data-[selectable=true]:focus:bg-secondary-ligth",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-gray-400",
          ],
          selectedIcon: "text-white"
        },
      }}

      popoverProps={{
        classNames: {
          base: "before:bg-default-200",
          content: "p-0 border-small border-divider rounded-lg bg-customblack",
        },
      }}
      className="max-w-xs"
    >
      {(options) => <SelectItem>{options.label}</SelectItem>}
    </Select>
      </div>
    </div>
  );
};

export default CategoriesBar;
