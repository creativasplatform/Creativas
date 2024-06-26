import { ethers } from 'ethers';
import { Rewards as rewardsAddress, rpcURL } from '../../utils/constans.js';
import RewardsABI from '../../utils/abi/nftVenture/Rewards.json';

const Private_Key = import.meta.env.VITE_PRIVATE_KEY;
const provider = new ethers.providers.JsonRpcProvider(rpcURL);
const wallet = new ethers.Wallet(Private_Key, provider);

const getRewardsContract = (signerOrProvider) => {
    return new ethers.Contract(rewardsAddress, RewardsABI, signerOrProvider);
};

export const addRewards = async (assetId, rewards) => {
    const contract = getRewardsContract(wallet);
    try {
        const tx = await contract.addRewards(assetId, rewards);
        await tx.wait();
        return tx;
    } catch (error) {
        console.error("Error adding rewards:", error);
        throw error;
    }
};

export const getRewardsForAsset = async (assetId) => {
    const contract = getRewardsContract(provider);
    try {
        const rewards = await contract.getRewardsForAsset(assetId);
        return rewards;
    } catch (error) {
        console.error("Error getting rewards for asset:", error);
        return [];
    }
};
