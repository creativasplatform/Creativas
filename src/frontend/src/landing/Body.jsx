import React from 'react';

const Body = ({ showButton, handleButtonClick }) => {
  return (
    <div>
      <div className="relative bg-gradient-to-r from-customblack to-primary flex flex-col md:flex-row justify-center items-center overflow-hidden py-20">
        <div className="w-full md:w-1/2 pr-8 md:-mt-20 lg:-mt-40 xl:-mt-40 mb-8 md:mb-0 sm:text-start ml-10 xs:ml-12 sm:ml-44 md:ml-0 xs:text-left  md:text-left">
          <h1 className="z-50 text-4xl md:text-5xl mb-4 md:mt-20 sm:text-6xl lg:text-7xl xl:text-7xl font-raleway font-black text-white ">
            Let's build a freer and more creative world
          </h1>
          <p className="text-xl md:text-xl mb-6 text-gray-100 z-50 font-roboto">
            Bring a brilliant idea to life with the community and build it together with everyone's help
          </p>
          {showButton && (
            <button
              type="button"
              onClick={handleButtonClick}
              className="text-secondary absolute z-40 -mt-2.5 bg-primary hover:bg-primary-ligth focus:outline-none font-medium rounded-full text-sm lg:text-lg px-5 py-2.5 text-center ml-4 dark:bg-white dark:text-secondary dark:hover:bg-gray-200"
            >
              Get Started
            </button>
          )}
        </div>
        <div className="relative w-full md:w-auto flex justify-center">
          <img className="rounded-lg relative z-10 max-w-none md:max-w-none sm:w-auto" src="https://brandconnector.io/images/touch.png" alt="Touch Image" />
          <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-rgba-104-207-255 blur-30 opacity-40  w-64 h-64 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default Body;
