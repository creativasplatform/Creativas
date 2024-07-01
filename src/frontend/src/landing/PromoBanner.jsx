import React from 'react';
import { FaTelegramPlane, FaDiscord, FaTwitter, FaInstagram } from 'react-icons/fa';
import Banner from '../assets/Banner.png'

const PromoBanner = () => {
  return (
    <div className="bg-gradient-to-r from-customblack to-primary flex justify-center py-8">
      <div className="bg-green text-black rounded-lg w-[80%] max-w-screen-xl shadow-lg flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-raleway mb-4 ml-3">Creativas is in beta on Roostock</h2>
          <div className="flex items-center space-x-4">
            <button className="bg-black text-white py-2 px-8 ml-3 rounded-lg  fond-semibold font-roboto text-[18px]">EXPLORE</button>
            <div className="flex space-x-2">
              <a href="#" className="text-black hover:text-gray-600"><FaTelegramPlane size={24} /></a>
              <a href="#" className="text-black hover:text-gray-600"><FaDiscord size={24} /></a>
              <a href="#" className="text-black hover:text-gray-600"><FaTwitter size={24} /></a>
              <a href="#" className="text-black hover:text-gray-600"><FaInstagram size={24} /></a>
            </div>
          </div>
        </div>
        <div className="flex space-x-2 ">
          <img src={Banner} alt="NFT" className="h-52 p-0" />
        </div>
      </div>
      
    </div>
  );
};

export default PromoBanner ;
