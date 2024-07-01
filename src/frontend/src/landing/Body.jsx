import React from 'react';
import cube from '../assets/cube.png';
import Numbers from './Numbers.jsx'; // Importa tu archivo SVG aquí
import touch from '../assets/touch.png'
import NUmbers from './Numbers.jsx';
const Body = () => {
  return (
    <div>
    <div className="relative bg-gradient-to-r from-customblack to-primary flex justify-center items-center overflow-hidden py-20">
      <div className="w-1/2 pr-8 -mt-40">
        <h1 className="text-7xl font-raleway text-left font-extrabold text-white mb-4">Let's build a freer and more creative world</h1>
        <p className="text-xl mb-6 text-gray-100">Bring a brilliant idea to life with the community and build it together with everyone's help.</p>
      </div>
      
      <div className="relative">
        <img className="rounded-lg relative z-10" src="https://brandconnector.io/images/touch.png" alt="Touch Image" />
        <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-rgba-104-207-255 blur-30 opacity-90 w-64 h-64 rounded-lg"></div>
      </div>


  

    </div>


    
    </div>
  );
}

export default Body;
