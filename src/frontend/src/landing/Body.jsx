import React from 'react';

const Body = ({ showButton, handleButtonClick }) => {
  return (
    <div>
      <div className="relative bg-gradient-to-r from-customblack to-primary flex flex-col md:flex-row justify-center items-center overflow-hidden py-20">
        <div className="w-full md:w-1/2 pr-8 mt- xs:mt- sm:mt- md:-mt-20 lg:-mt-40 xl:-mt-24 mb-8 md:mb-0 sm:text-start ml-10 xs:ml-12 sm:ml-44 md:ml-0 lg:ml-44 xl:ml-12 xs:text-left  md:text-left">
          <h1 className="z-50 text-4xl md:text-5xl mb-4 md:mt-20 sm:text-6xl lg:text-7xl xl:text-7xl font-raleway font-black text-white ">
            Let's build a freer <br/> and more creative world
          </h1>
          <p className="text-xl md:text-xl mb-6 text-gray-100 z-50 font-roboto">
            Bring a brilliant idea to life with the community <br/> and build it together with everyone's help
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
          <img className="rounded-lg relative z-10 w-36 h-36 xs:- xs:- sm:w- sm:h- md:w-40 md:h-40 lg:w-96 lg:h-96 xl:w-[450px] xl:h-[400px] xs:- xs:- sm:w- sm:h- xs:ml-40 sm:ml-40 md:ml-96 lg:ml-[450px] xl:-ml-24" src="https://brandconnector.io/images/touch.png" alt="Touch Image" />
          <div className="absolute top-3/4 ml-44 transform -translate-x-1/2 -translate-y-1/2 bg-rgba-104-207-255 blur-30 opacity-40  w-64 h-64 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default Body;
