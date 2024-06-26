import React from 'react';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-customblack to-primary  text-white pt-8 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold  font-raleway mb-4 mt-24">
        Create, fund and participate
          <span className="text-secondary font-raleway"> in extraordinary NFTs projects</span>
        </h1>
        <p className="text-xl mb-8">
        Creativas is a new NFT model. It uses a decentralized network of blockchain-guaranteed smart contracts. to create a safer, cheaper and more global crowdfunding service.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-secondary text-black py-2 px-4 rounded-lg fond-semibold font-roboto text-[18px]">
            EXPLORE
          </button>
          <button className="bg-gray-800 text-white py-2 px-4 rounded-lg fond-semibold font-roboto text-[18px] border border-gray-700">
            + CREATE
          </button>
        </div>
      </div>
  
      
    </div>
  );
};

export default HeroSection;
