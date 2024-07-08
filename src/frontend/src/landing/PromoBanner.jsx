import React from 'react';
import { FaTelegramPlane, FaDiscord, FaTwitter, FaInstagram } from 'react-icons/fa';
import Banner from '../assets/Banner.png'

const PromoBanner = () => {
  return (
    <div className="bg-gradient-to-r from-customblack to-primary flex justify-center py-8">
      <div className="bg-green text-black rounded-lg w-[80%] max-w-screen-xl shadow-lg flex items-center justify-between">
        <div>
          <h2 className="lg:ml-16 text-lg md:text-xl lg:text-2xl xl:text-2xl font-bold font-raleway mb-4 ml-3">Crowdfunding revolution is coming </h2>
          <div className="flex items-center space-x-4 lg:ml-16">
            <button className="bg-black text-white py-1 px-4 ml-3 rounded-lg  fond-semibold font-roboto text-[8px] md:text-[16px] lg:text-[20px] xl:text-[24px]">EXPLORE</button>
            <div className="flex space-x-2">
              <a href="#" className="text-black hover:text-gray-600">
                <FaTelegramPlane className="text-xs md:text-base lg:text-lg xl:text-xl" />
              </a>
              <a href="#" className="text-black hover:text-gray-600">
                <FaDiscord className="text-xs md:text-base lg:text-lg xl:text-xl" />
              </a>
              <a href="#" className="text-black hover:text-gray-600">
                <FaTwitter className="text-xs md:text-base lg:text-lg xl:text-xl" />
              </a>
              <a href="#" className="text-black hover:text-gray-600">
                <FaInstagram className="text-xs md:text-base lg:text-xl xl:text-xl" />
              </a>
            </div>
          </div>
        </div>
        <div className="flex-grow overflow-hidden">
          <img src={Banner} alt="NFT" className="h-52 p-0 z-0 lg:mr-16" />
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
