import React from 'react';
import { ethers } from 'ethers';
import aceptarpicture from "../assets/aceptar.png";


const truncateAssetName = (name) => {
  if (name.length > 14) {
    return `${name.substring(0, 14)}...`;
  }
  return name;
};
 

const CardNFT = ({ id, assetName, imageSrc, objective, investmentAmount, className, investorCount, style }) => {
  const formattedInvestmentAmount = ethers.BigNumber.isBigNumber(investmentAmount)
    ? investmentAmount.toString()
    : investmentAmount;

  const formattedInvestorCount = ethers.BigNumber.isBigNumber(investorCount)
    ? investorCount.toString()
    : investorCount;


    const formattedId = ethers.BigNumber.isBigNumber(id)
    ? id.toString()
    : id;


  
  return (
    <div className={`bg-gradient-to-c-custom text-white rounded-xl shadow-lg w-80 h-72 mb-4 ${className}`} style={style}>
      <img src={imageSrc} alt={assetName} className="w-[300px] mt-2 h-48 object-cover rounded-xl" />
      <div className="p-4">
      
        <p className="text-lg font-semibold text-white flex items-start justify-start">
          
        {truncateAssetName(assetName)} <img src={aceptarpicture} alt="Checkmark" className="w-4 h-4 mt-1 ml-2" />

        <div className="right-3 text-white -mt-3 px-2 py-1 rounded">
        #{formattedId}
      </div>
        </p>
        <div className="text-sm text-gray-400">
          <p className="flex items-center">
         {formattedInvestmentAmount} backers
          </p>
        </div>
        <div className="text-sm justify-end ml-44 -mt-8">
          <p className="flex items-center text-white -mt-10">
         {objective}
          </p>

          <p className="flex items-center text-gray-400">
        Goal
          </p>
        </div>
    
      </div>
    </div>
  );
};

export default CardNFT;
