import React from 'react';
import Linea from '../assets/Linea2.png';
import wallet1 from '../assets/paso1.png'
import Paso2 from '../assets/paso2.png'
import Paso3 from '../assets/paso3.png'
import Paso4 from '../assets/paso4.png'
const NFTSteps = () => {
  return (
    <div className="relative bg-customblack text-white py-32 px-8 overflow-hidden font-roboto">
      <div className='mb-24'>
      <span className="text-3xl font-semibold mb-8 text-left font-raleway">
                <span className="text-white">Create and sell    </span>
                <span className="text-secondary">your NFTs</span>
              </span>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 relative z-10">
        <div className="">
          <img src={wallet1} className='ml-0 w-[99px] -mt-8'></img>
          <div className="mb-0">
          <div className="w-16 h-16 flex ml-28 -mt-24 mx-auto mb-24">
            <span className="text-[50px] font-ligth font-roboto">
                <span className="text-white">0</span>
                <span className="text-secondary">1</span>
              </span>

            </div>
            <h3 className="text-xl font-semibold mb-2 font-raleway leading-[28px] mx-auto max-w-xs">Set up your wallet</h3>
            <p className="text-[#9398A7] font-roboto text-[17px] leading-[28px] mx-auto max-w-xs">Once you've set up your wallet of choice, connect it to OpenSea by clicking the wallet icon in the top right corner. Learn about the wallets we support.</p>
          </div>
        </div>
        <div className="">
          <img src={Paso2} className='-ml-6 w-[99px] -mt-8'></img>
          <div className="mb-4">
            
          <div className="w-16 h-16 flex ml-24 -mt-24 mx-auto mb-24">
            <span className="text-[50px] font-ligth font-roboto">
                <span className="text-white">0</span>
                <span className="text-secondary">2</span>
              </span>

            </div>
            <h3 className="text-xl font-semibold mb-2 font-raleway leading-[28px] mx-auto max-w-xs">Create your collection</h3>
            <p className="text-[#9398A7] font-roboto text-[17px] leading-[28px] mx-auto max-w-xs">Click My Collections and set up your collection. Add social links, a description, profile & banner images, and set a secondary sales fee.</p>
          </div>
        </div>
        <div className="">
          <img src={Paso3} className='-ml-10 w-[97px] -mt-6'></img>
          <div className="mb-4">
          <div className="w-16 h-16 flex ml-24 -mt-24 mx-auto mb-24">
            <span className="text-[50px] font-ligth font-roboto">
                <span className="text-white">0</span>
                <span className="text-secondary">3</span>
              </span>

            </div>
            <h3 className="text-xl font-semibold mb-2 font-raleway leading-[28px] mx-auto max-w-xs">Add your NFTs</h3>
            <p className="text-[#9398A7] font-roboto text-[17px] leading-[28px] mx-auto max-w-xs">Once you've set up your wallet of choice, connect it to OpenSea by clicking the wallet icon in the top right corner. Learn about the wallets we support.</p>
          </div>
        </div>
        <div className="">
          <img src={Paso4} className='-ml-6 w-[90px] -mt-8'></img>
          <div className="mb-4">
            <div className="w-16 h-16 flex ml-24 -mt-24 mx-auto mb-24">
            <span className="text-[50px] font-ligth font-roboto">
                <span className="text-white">0</span>
                <span className="text-secondary">4</span>
              </span>

            </div>
            <h3 className="text-xl font-semibold mb-2 font-raleway leading-[28px] mx-auto max-w-xs">List them for sale</h3>
            <p className="text-[#9398A7] font-roboto text-[17px] leading-[28px] mx-auto max-w-xs">Choose between auctions, fixed-price listings, and declining-price listings. You choose how you want to sell your NFTs, and we help you sell them!</p>
          </div>
        </div>
      </div>
      <img
        className='absolute left-16 -mt-52 object-cover z-0 max-w-[73vw] max-h-[25vw] mx-auto'
        src={Linea}
        alt="Linea"
      />
    </div>
  );
};

export default NFTSteps;
