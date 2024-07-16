import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import useAssets from '../../hooks/Nftventure/useAssets';
import { Card, Skeleton, Spinner } from "@nextui-org/react";
import { ethers, BigNumber } from "ethers";
import CardDetails from './CardDetails';

const NFTDetail = () => {
  const { id } = useParams();
  const [timeLeft, setTimeLeft] = useState(0);
  const { fetchAssetById, asset, loadingFetchingAsset, errorFetchingAsset } = useAssets();

  useEffect(() => {
    fetchAssetById(id);
  }, [id, fetchAssetById]);

  useEffect(() => {
    if (asset) {
      const now = Math.floor(Date.now() / 1000); // Current time in seconds
      const projectEndDate = BigNumber.from(asset.projectEndDate._hex).toNumber();
      const timeLeft = projectEndDate - now;

      setTimeLeft(timeLeft > 0 ? timeLeft : 0);
    }
  }, [asset]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hrs = Math.floor((seconds % (3600 * 24)) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${days}d ${hrs}h ${mins}m ${secs}s`;
  };

  const springProps = useSpring({
    number: timeLeft,
    from: { number: timeLeft + 1 },
    config: { duration: 1000 },
    reset: true,
  });

  return (
    <div>
      <div className="flex justify-center p-2 bg-customblack">
        {loadingFetchingAsset ? (
          <>
            <Spinner color="secondary" size='lg' className="w-[400px] h-[400px] space-y-5 mr-24 p-4 mt-32 mb-32" radius="lg" />
            <div className="flex items-center gap-3">
              <div>
                <Card className="w-[400px] h-[400px] space-y-5 p-4" radius="lg">
                  <div className="space-y-3">
                    {Array.from({ length: 12 }).map((_, index) => (
                      <Skeleton key={index} className="w-3/5 rounded-lg">
                        <div className="h-3 w-full rounded-lg bg-default-200"></div>
                      </Skeleton>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </>
        ) : (
          asset && (
            <>
              <div className="max-w-xl overflow-hidden shadow-lg p-4 mt-16 mr-16">
                <img className="w-full h-4/5 object-contain rounded-lg" src={asset.mainPhoto} alt="NFT Asset" />
              </div>
              <div className="bg-primary h-full max-w-sm mt-16 rounded-lg overflow-hidden shadow-lg text-white p-6 m-4">
                <div className="text-lg font-bold font-raleway mb-2 text-secondary">Funding goal</div>
                <div className="text-lg font-roboto mb-2">${asset.price.toString()}</div>
                <div className="text-lg font-bold mb-2 font-roboto">This project has {asset.rewards.length} reward tiers:</div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {asset.rewards.map((reward, index) => {
                    const price = ethers.BigNumber.from(reward[2]._hex).toString();

                    return (
                      <div key={index} className="bg-[#1C2230] rounded-lg p-4 flex flex-col">
                        <div className="flex-grow">
                          <div className="text-sm font-bold mb-1">{reward[0]}</div>
                        </div>
                        <div className="text-xs text-white mt-1">{`Price: ${price}`}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="text-lg font-bold font-raleway">The end:</div>
                <div className="text-xl mb-4 text-white font-roboto">
                  <animated.div>
                    {springProps.number.to(number => formatTime(Math.floor(number)))}
                  </animated.div>
                </div>
                <div className="flex justify-center">
                  <button className="bg-secondary hover:bg-secondary-light w-full text-white font-roboto font-bold py-2 px-4 rounded">
                    Invest
                  </button>
                </div>
              </div>
            </>
          )
        )}
      </div>
      {asset && <CardDetails asset={asset} />}
    </div>
  );
};

export default NFTDetail;
