import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Collectibles from '../../assets/Collectibles.png';
import { useSpring, animated } from '@react-spring/web';
import useAssets from '../../hooks/Nftventure/useAssets';
const NFTDetail = () => {
  const { id } = useParams();
  const [timeLeft, setTimeLeft] = useState(86400); 
  const { fetchAssetById, asset, loadingFetchingAsset, errorFetchingAsset } = useAssets();


  console.log(asset)


  useEffect(() => {
    fetchAssetById(id);
  }, [id, fetchAssetById]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  const springProps = useSpring({
    number: timeLeft,
    from: { number: timeLeft + 1 },
    config: { duration: 1000 },
    reset: true,
  });

  return (
    <div className="flex justify-center space-x-4 p-4 bg-customblack">
      <div className="max-w-xl overflow-hidden shadow-lg p-4 mt-16 mr-16">
        <img className="w-full h-auto rounded-lg" src={Collectibles} alt="Card 1" />
      </div>

      <div className="max-w-sm mt-16 rounded-lg overflow-hidden shadow-lg bg-primary text-white p-6 m-4">
        <div className="text-lg font-bold font-raleway mb-2 text-secondary">Funding Objective</div>
        <div className="text-xl font-bold font-roboto mb-2">82,235$ - 1,12 RBTC</div>
        <div className="text-lg font-bold mb-2">This project has 2 reward tiers:</div>

        <div className="flex justify-between mb-4 space-x-8">
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

        <div className="text-lg font-bold">Time Left:</div>
        <div className="text-xl font-bold mb-4">
          <animated.div>
            {springProps.number.to(number => formatTime(Math.floor(number)))}
          </animated.div>
        </div>

        <div className="flex justify-center mb-4">
          <button className="bg-secondary w-full hover:bg-secondary-ligth text-white font-roboto font-bold py-2 px-4 rounded">
            Invest
          </button>
        </div>
      </div>
    </div>
  );
};

export default NFTDetail;
