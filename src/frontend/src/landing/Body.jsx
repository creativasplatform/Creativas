import React from 'react';

const Body = () => {
  return (
    <div>
      <div className="relative bg-gradient-to-r from-customblack to-primary flex flex-col md:flex-row justify-center items-center overflow-hidden py-20">
        <div className="w-full md:w-1/2 pr-8 md:-mt-40 mb-8 md:mb-0 sm:text-start ml-10 xs:ml-12 sm:ml-44 md:ml-0 xs:text-left  md:text-left">
          <h1 className="text-4xl md:text-5xl mb-4 md:mt-20 sm:text-6xl lg:text-7xl xl:text-7xl font-raleway font-extrabold text-white ">
            Let's build a freer and more creative world
          </h1>
          <p className="text-xl md:text-xl mb-6 text-gray-100">
            Bring a brilliant idea to life with the community and build it together with everyone's help.
          </p>
        </div>
        <div className="relative w-full md:w-auto flex justify-center">
          <img className="rounded-lg relative z-10 max-w-none md:max-w-none sm:w-auto" src="https://brandconnector.io/images/touch.png" alt="Touch Image" />
          <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-rgba-104-207-255 blur-30 lg:opacity-90 xl:opacity-90 opacity-20  w-64 h-64 rounded-lg"></div>
         </div>
      </div>
    </div>
  );
};

export default Body;
