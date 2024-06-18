import React from 'react';
import Ajustes from '../assets/Ajustes.png'
import Apagar from '../assets/Apagar.png'


const Sidebar = ({ onClose }) => {
  return (
    <div className="w-1/4 bg-customblack shadow-lg p-4 h-full fixed right-0 top-0">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className="bg-green-500 p-2 rounded-full text-white">
            <span role="img" aria-label="wallet">💳</span>
          </div>
          <div className="ml-2">
            <p className="text-sm font-medium text-white">0x1B95...368c</p>
          </div>
        </div>
        <div className="flex items-center">
          <button onClick={onClose} className="ml-52">
            <img role="img" src={Ajustes} className='w-[30px]'></img>
          </button>
        </div>
        <div className="flex items-center">
          <button onClick={onClose} className="">
            <img role="img" src={Apagar} className='w-[28px]'></img>
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <p className="text-4xl font-semibold text-white">0,00 $</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button className="bg-secondary/40  p-4 rounded-lg flex flex-col items-center">
          <span role="img" aria-label="buy" className="text-pink-500 text-2xl">💰</span>
          <p className="text-secondary mt-2">Comprar</p>
        </button>
        <button className="bg-secondary/40 p-4 rounded-lg flex flex-col items-center">
          <span role="img" aria-label="view-nft" className="text-pink-500 text-2xl">🖼️</span>
          <p className="text-secondary mt-2">Ver NFT</p>
        </button>
      </div>



      <div className="flex justify-around text-gray-500 mb-8">
        <button className="font-bold text-white">NFT</button>
        <button>Rewards</button>
        <button>Activity</button>
      </div>
      <div className="flex flex-col items-center mb-6">
        <div className="text-gray-400 mb-2">
          <span role="img" aria-label="no-nft" className="text-5xl">🖼️</span>
        </div>
        <p className="text-gray-500">Aún no hay NFT</p>
        <p className="text-gray-400 text-sm mb-4 text-center">Compre o transfiera NFT a esta billetera para comenzar.</p>
        <button className="bg-pink-500 text-white p-2 rounded-lg">Explorar las NFT</button>
      </div>
    </div>
  );
};

export default Sidebar;
