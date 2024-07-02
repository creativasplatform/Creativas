import { ethers } from "ethers";
import { Assets as assetsAddress, rpcURL } from "../../utils/constans.js"; 
import AssetsAbi from "../../utils/abi/nftVenture/Assets.json"; 

const Private_Key = import.meta.env.VITE_PRIVATE_KEY;
const provider = new ethers.providers.JsonRpcProvider(rpcURL);
const wallet = new ethers.Wallet(Private_Key, provider);


const getAssetsContract = (signerOrProvider) => {
  return new ethers.Contract(assetsAddress, AssetsAbi, signerOrProvider);
};

export async function getAssets(status) {
  const contract = getAssetsContract(provider);

  try {
    const assets = await contract.getAllAssets(status);
    return assets;
  } catch (error) {
    console.error("Error getting assets:", error);
    return [];
  }
}

export async function getAssetById(assetId) {
  const contract = getAssetsContract(provider);

  try {
    const asset = await contract.getAssetById(assetId);
    return asset;
  } catch (error) {
    console.error("Error getting asset by ID:", error);
    return null;
  }
}

export async function getAssetsOfOwner(ownerAddress) {
  const contract = getAssetsContract(provider);

  try {
    const assets = await contract.getAssetsOfOwner(ownerAddress);
    return assets;
  } catch (error) {
    console.error("Error getting assets of owner:", error);
    return [];
  }
}

export async function addAsset(price, author, title, description, projectEndDate, to, tokenURI, mainPhoto, secondaryPhotos, category) {
  const contract = getAssetsContract(wallet);

  try {
    const tx = await contract.addAsset(price, author, title, description, projectEndDate, to, tokenURI, mainPhoto, secondaryPhotos, category);
    const receipt = await tx.wait();

    const event = receipt.events.find(event => event.event === 'AssetCreated');
    const assetId = event.args.assetId;
    return {
      transactionHash: tx.hash,
      assetId: assetId.toString()
    };
  } catch (error) {
    console.error("Error adding asset:", error);
    throw error;
  }
}



export async function updateAsset(signer, assetId, mainPhoto, secondaryPhotos, description) {
  const contract = getAssetsContract(signer);

  try {
    const tx = await contract.UpdateAsset(assetId, mainPhoto, secondaryPhotos, description);
    await tx.wait();
    return tx;
  } catch (error) {
    console.error("Error updating asset:", error);
    throw error;
  }
}
