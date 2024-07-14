import React from 'react';
import { useParams } from 'react-router-dom';
import Collectibles from '../../assets/Collectibles.png'

const NFTDetail = () => {
  const { id } = useParams();

  return (
    <div className="flex justify-center space-x-4 p-4 bg-gradient-to-l from-primary to-customblack">
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4">
      <img className="w-full" src={Collectibles} alt="Card 1" />
     
    </div>

    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-[#0D111C] text-white p-6 m-4">
      <div className="text-lg font-bold mb-2">FUNDING OBJECTIVE</div>
      <div className="text-3xl font-bold mb-2">1,12 RBTC</div>
      <div className="text-xl mb-4">82,235 MIL $</div>
      <div className="text-lg font-bold mb-2">FINAL DAY OF FINANCING</div>
      <div className="mb-4">OCTOBER 22, 2024</div>
      <div className="text-lg font-bold mb-2">THIS PROJECT HAS 2 REWARD TIERS:</div>
      
      <div className="flex justify-between mb-4">
        <div className="bg-[#1C2230] rounded-lg p-4 flex flex-col items-center">
          <div className="text-sm font-bold mb-1">General Tokens</div>
          <div className="text-sm">Price</div>
          <div className="text-sm font-bold mb-1">0.00148 RBTC</div>
          <div className="text-sm mb-1">$100</div>
          <div className="text-sm">1000/3000 sold</div>
        </div>
        <div className="bg-[#1C2230] rounded-lg p-4 flex flex-col items-center">
          <div className="text-sm font-bold mb-1">VIP Tokens</div>
          <div className="text-sm">Price</div>
          <div className="text-sm font-bold mb-1">0.00444 RBTC</div>
          <div className="text-sm mb-1">$300</div>
          <div className="text-sm">300/1500 sold</div>
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          SPONSOR THIS PROJECT
        </button>
      </div>
      
      <div className="text-sm text-gray-400">
        Owner: 0xa9...cb81
      </div>
    </div>
</div>
  );
};

export default NFTDetail;
