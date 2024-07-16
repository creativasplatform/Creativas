import React from 'react';
import { ethers, BigNumber } from "ethers";
const CardDetails = ({ asset }) => {
  const {
    title,
    description,
    rewards,
  } = asset;

  return (
    <div className="flex justify-center space-x-4 p-4 bg-customblack">
      <div className="text-white rounded-lg p-14 space-y-4">
        <div className="bg-primary p-4 rounded-lg space-y-4">
          <div>
            <h2 className="text-2xl font-bold">PROJECT OVERVIEW</h2>
            <p>{description}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">REWARDS</h2>
            <p>ERC-1155 Tokens: Fungible and non-fungible tokens are split for rewards.</p>
            <div className="space-y-2">
              {rewards.map((reward, index) => {
                const price = ethers.BigNumber.from(reward[2]._hex).toString();
                return (
                  <div key={index}>
                    <h3 className="text-xl font-semibold">{reward[0]}</h3>
                    <p>Price: {price}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
