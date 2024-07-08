import React from 'react';

const Body = ({ isMobile, showButton, handleButtonClick }) => {
  return (
    <div>
      <div className="relative bg-gradient-to-r from-customblack to-primary flex flex-col md:flex-row justify-center items-center overflow-hidden py-20">
        <div className="w-full md:w-1/2 pr-8 mt-2 md:-mt-16 lg:-mt-20 xl:-mt-24 mb-8 md:mb-0 sm:text-start ml-16 xs:ml-32 sm:ml-32 md:ml-4 lg:ml-8 xl:ml-12 xs:text-left  md:text-left">
          <h1 className="z-50 text-6xl  mb-4 md:mt-20 sm:text-8xl md:text-6xl lg:text-7xl xl:text-7xl font-raleway font-black text-white ">
            Let's build a freer <br/> and more creative world
          </h1>
          <p className="text-xl md:text-xl mb-6 text-gray-100 z-50 font-roboto">
            Bring a brilliant idea to life with the community <br/> and build it together with everyone's help
          </p>
          {showButton && (
            <button
              type="button"
              onClick={handleButtonClick}
              className="text-secondary absolute z-40 mt-4 bg-primary hover:bg-primary-ligth focus:outline-none font-medium rounded-full text-sm lg:text-lg px-5 py-2.5 text-center  dark:bg-white dark:text-secondary dark:hover:bg-gray-200"
            >
              Get Started
            </button>
          )}
        </div>
        <div className={`relative w-full md:w-auto flex justify-center mt-8 sm:mt-12 ${isMobile ? 'items-center' : ''}`}>
          <img className="mt-8 sm:mt-12 md:-mt-12 lg:-mt-12 xl:-mt-16 rounded-lg relative z-10 w-80 h-80 sm:w-[450px] sm:h-[450px] md:w-[350px] md:h-[300px] lg:w-[400px] lg:h-[350px] xl:w-[450px] xl:h-[400px] md:-ml-4 lg:-ml-22 xl:-ml-24 ml-auto mr-auto xs:ml-auto xs:mr-auto"  src="https://brandconnector.io/images/touch.png" alt="Touch Image" />
          <div className="absolute top-3/4 ml-44 transform -translate-x-1/2 -translate-y-1/2 bg-rgba-104-207-255 blur-30 opacity-40  w-64 h-64 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default Body;
