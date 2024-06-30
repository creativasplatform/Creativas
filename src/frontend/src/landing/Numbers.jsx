import React from 'react';
import cube from '../assets/cube.png';
import check from '../assets/check.svg';

const NUmbers = () => {
  return (
    <div>             
    <div className="relative bg-gradient-to-r from-customblack to-primary flex justify-center items-center overflow-hidden py-20">

      <div className="mt-20 bg-gradient-to-l from-customblack to-primary text-white flex p-8 w-7/12 h-40  max-w-7xl mx-auto rounded-xl border border-green">
        <div className="w-full">
          <div className="flex justify-between mb-6">
            <div>
            <p className="text-center text-5xl font-raleway mb-4">522</p>
              <h2 className="text-lg font-semibold font-roboto text-gray-400 text-center">Projects Fully Funded</h2>
             
            </div>
            <div>
            <p className="text-center text-5xl font-raleway mb-4">$470B+</p>
              <h2 className="text-lg font-semibold font-roboto text-gray-400 text-center">Total Raised</h2>
          
            </div>
            <div>
            <p className="text-center text-5xl font-raleway mb-4">14.7M+</p>
              <h2 className="text-lg text-gray-400 font-roboto font-semibold text-center">Contributions Made</h2>
             
            </div>
            <div>
            <p className="text-center text-5xl font-raleway mb-4">86.4M+</p>
              <h2 className="text-lg font-semibold font-roboto text-gray-400 text-center">Total Rewards trades</h2>

            </div>            
          </div>          
        </div>        
      </div>
      <img className="absolute top-24 right-32 picture z- opacity-80" src={check} alt="Cube Image" />     
    </div>  
    <img className="absolute top-2/4 -mt-10 left-24 picture z-1 opacity-80" src={cube} alt="Cube Image" /> 
    <div className="absolute top-4/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-rgba-104-207-256 blur-40 opacity-100 w-64 h-64 rounded-lg"></div>


    </div>
  );
}

export default NUmbers;