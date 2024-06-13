import { ethers } from "ethers";
import { Assets as assetsAddress } from "../../utils/constans.js";
import Assets from "../../utils/abi/nftVenture/Assets.json";



 async function addAsset(
    signer,
    price,
    author,
    title,
    description,
    projectEndDate,
    to,
    tokenURI,
    mainPhoto,
    secondaryPhotos
  ) {
    const contract = new ethers.Contract(assetsAddress, Assets, signer);
  
    try {
      const tx = await contract.addAsset(
        price,
        author,
        title,
        description,
        projectEndDate,
        to,
        tokenURI,
        mainPhoto,
        secondaryPhotos
      );
      await tx.wait();
      return tx;
    } catch (error) {
      console.error("Error adding asset:", error);
      throw error;
    }
  }
  
  export default addAsset;