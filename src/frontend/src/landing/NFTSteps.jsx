import React, { useEffect, useState } from 'react';
import Linea from '../assets/Linea2.png';
import wallet1 from '../assets/paso1.png';
import Paso2 from '../assets/paso2.png';
import Paso3 from '../assets/paso3.png';
import Paso4 from '../assets/paso4.png';

const NFTSteps = () => {
  const [Image, setImage] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1701) {
        setImage(Linea);
      } else {
        setImage(null);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative bg-gradient-to-b from-customblack to-primary text-white py-32 px-8 overflow-hidden font-roboto">
      <div className="mb-24">
        <span className="text-3xl font-semibold mb-8 text-left font-raleway">
          <span className="text-white">Create and finance </span>
          <span className="text-secondary">your project</span>
        </span>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 relative z-10">
        <div className="">
          <img src={wallet1} className="-ml-6 w-[99px] -mt-8 picture" alt="Step 1" />
          <div className="mb-0">
            <div className="w-16 h-16 flex ml-28 -mt-24 mx-auto mb-24">
              <span className="text-[50px] font-ligth font-roboto">
                <span className="text-white">0</span>
                <span className="text-secondary">1</span>
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2 font-raleway leading-[28px] mx-auto max-w-xs">Set up your wallet</h3>
            <p className="text-[#9398A7] font-roboto text-[17px] leading-[28px] mx-auto max-w-xs">Once you've set up the wallet of your choice, such as MetaMask or using your email address, you're ready to get started.</p>
          </div>
        </div>
        <div className="">
          <img src={Paso2} className="-ml-6 w-[99px] -mt-8 picture" alt="Step 2" />
          <div className="mb-4">
            <div className="w-16 h-16 flex ml-24 -mt-24 mx-auto mb-24">
              <span className="text-[50px] font-ligth font-roboto">
                <span className="text-white">0</span>
                <span className="text-secondary">2</span>
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2 font-raleway leading-[28px] mx-auto max-w-xs">Create your project</h3>
            <p className="text-[#9398A7] font-roboto text-[17px] leading-[28px] mx-auto max-w-xs">Tell us all about what you're creating and get creative with your personalized rewards to attract future backers.</p>
          </div>
        </div>
        <div className="">
          <img src={Paso3} className="-ml-6 w-[97px] -mt-6 picture" alt="Step 3" />
          <div className="mb-4">
            <div className="w-16 h-16 flex ml-24 -mt-24 mx-auto mb-24">
              <span className="text-[50px] font-ligth font-roboto">
                <span className="text-white">0</span>
                <span className="text-secondary">3</span>
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2 font-raleway leading-[28px] mx-auto max-w-xs">Share your project</h3>
            <p className="text-[#9398A7] font-roboto text-[17px] leading-[28px] mx-auto max-w-xs">Share your project to attract potential backers and let them know what you're working on.</p>
          </div>
        </div>
        <div className="">
          <img src={Paso4} className="-ml-6 w-[90px] -mt-8 picture" alt="Step 4" />
          <div className="mb-4">
            <div className="w-16 h-16 flex ml-24 -mt-24 mx-auto mb-24">
              <span className="text-[50px] font-ligth font-roboto">
                <span className="text-white">0</span>
                <span className="text-secondary">4</span>
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2 font-raleway leading-[28px] mx-auto max-w-xs">Get the funds and start working</h3>
            <p className="text-[#9398A7] font-roboto text-[17px] leading-[28px] mx-auto max-w-xs">Use the raised funds to reach your project's goals and reward your backers with the promised benefits.</p>
          </div>
        </div>
      </div>
      {Image && (
        <img
          className="absolute left-16 -mt-52 object-cover z-0 max-w-[73vw] max-h-[25vw] mx-auto"
          src={Image}
          alt="Linea"
        />
      )}
    </div>
  );
};

export default NFTSteps;
