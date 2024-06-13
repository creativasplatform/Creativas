import { ethers } from "ethers";
import { Assets as assetsAddress, rpcURL } from "../../utils/constans.js"; 
import Assets from "../../utils/abi/nftVenture/Assets.json"; 

const provider = new ethers.providers.JsonRpcProvider(rpcURL);

async function getAssets(status) {
  const contract = new ethers.Contract(assetsAddress, Assets, provider);

  try {
    const assets = await contract.getAllAssets(status);
    return assets;
  } catch (error) {
    console.error("Error getting assets:", error);
    return [];
  }
}


export default getAssets;