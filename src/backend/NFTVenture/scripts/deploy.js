async function main() {
  const { ethers, deployments, getNamedAccounts } = require("hardhat");
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log('Deploying contracts with the account:', deployer);

  const deployerSigner = await ethers.getSigner(deployer);
  console.log(
    'Account balance:',
    (await deployerSigner.getBalance()).toString()
  );

  // Deploy NFT contract first
  const contractNFTVenture = await deploy('NFTVenture', {
    from: deployer,
    log: true,
  });
  const NFTVenture = await ethers.getContractAt('NFTVenture', contractNFTVenture.address);
  console.log('NFTVenture deployed to:', NFTVenture.address);

  // Deploy Rewards contract with the NFT contract address as a parameter
  const contractRewards = await deploy('Rewards', {
    from: deployer,
    args: [NFTVenture.address], // Pass the NFT contract address to the Rewards constructor
    log: true,
  });
  const Rewards = await ethers.getContractAt('Rewards', contractRewards.address);
  console.log('Rewards deployed to:', Rewards.address);


  // Deploy Assets contract with the NFT contract address as a parameter
  const contractAssets = await deploy('Assets', {
    from: deployer,
    args: [NFTVenture.address], // Pass the NFT contract address to the Assets constructor
    log: true,
  });
  const Assets = await ethers.getContractAt('Assets', contractAssets.address);
  console.log('Assets deployed to:', Assets.address);

  // Deploy Investments contract with the NFT contract address as a parameter
  const contractInvestments = await deploy('Investments', {
    from: deployer,
    args: [NFTVenture.address, Rewards.address], // Pass the NFT contract address to the Investments constructor
    log: true,
  });
  const Investments = await ethers.getContractAt('Investments', contractInvestments.address);
  console.log('Investments deployed to:', Investments.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
