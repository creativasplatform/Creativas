import React from 'react';
import { FaTelegramPlane, FaDiscord, FaTwitter, FaInstagram } from 'react-icons/fa';
import Banner from '../assets/Banner.png';

const PromoBanner = () => {
  return (
    <div className="bg-gradient-to-r from-customblack to-primary flex justify-center py-8">
      <div className="bg-green text-black rounded-lg w-[80%] max-w-screen-xl shadow-lg flex items-center justify-between overflow-hidden">
        <div className="text-center md:text-left p-4 w-full md:w-auto">
          <h2 className="text-2xl font-bold font-raleway mb-4">Creativas is in beta on Roostock</h2>
          <div className="flex flex-col md:flex-row items-center md:space-x-4">
            <button className="bg-black text-white py-2 px-8 rounded-lg font-semibold font-roboto text-[18px] mb-4 md:mb-0">EXPLORE</button>
            <div className="flex space-x-2 hidden md:flex">
              <a href="#" className="text-black hover:text-gray-600"><FaTelegramPlane size={24} /></a>
              <a href="#" className="text-black hover:text-gray-600"><FaDiscord size={24} /></a>
              <a href="#" className="text-black hover:text-gray-600"><FaTwitter size={24} /></a>
              <a href="#" className="text-black hover:text-gray-600"><FaInstagram size={24} /></a>
            </div>
          </div>
        </div>
        <div className="h-52 flex-shrink-0 overflow-hidden w-full md:w-auto">
          <img src={Banner} alt="NFT" className="h-full w-auto object-cover" />
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
