import { ethers } from "ethers";
import { Assets as assetsAddress, rpcURL } from "../../utils/constans.js"; 
import Assets from "../../utils/abi/nftVenture/Assets.json"; 

const provider = new ethers.providers.JsonRpcProvider(rpcURL);

async function getAssetById(assetId) {
  const contract = new ethers.Contract(assetsAddress, Assets, provider);

  try {
    const asset = await contract.getAssetById(assetId);
    return asset;
  } catch (error) {
    console.error("Error getting asset by ID:", error);
    return null;
  }
}

export default getAssetById;
