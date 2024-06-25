// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.8.19;

import "./FCTVToken.sol";
import "./NFTVenture.sol";
import "./AssetStruct.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

contract Rewards is ERC1155Holder  {
     NFTVenture private nftContract;
    address public supervisor;

    //Events
    event RewardsAdded(uint256 indexed assetId, uint256 rewardsCount);

    // Constructor
    constructor(address nftAddress) {
        nftContract = NFTVenture(nftAddress);
        supervisor = msg.sender;
    }

    modifier onlySupervisor() {
        require(msg.sender == supervisor, "Only supervisor can call this function");
        _;
    }

    ////////////////////////////////////////////////////////////////////////////////
    // Functions Rewards //
    ////////////////////////////////////////////////////////////////////////////////

    function addRewards(uint256 assetId, NewReward[] memory rewards) public onlySupervisor {
        require(nftContract.exists(assetId), "Asset does not exist");
        Asset memory asset = nftContract.getAsset(assetId);

        if (asset.rewardTokenAddress == address(0)) {
            FCTVToken rewardToken = new FCTVToken("");
            asset.rewardTokenAddress = address(rewardToken);
            nftContract.updateRewardTokenAddress(assetId, address(rewardToken));
        }

        FCTVToken rewardTokenContract = FCTVToken(asset.rewardTokenAddress);

        for (uint256 i = 0; i < rewards.length; i++) {
            bytes32 rewardId = keccak256(abi.encodePacked(assetId, i));
            rewardTokenContract.mint(
                address(this),
                uint256(rewardId),
                rewards[i].tokenAmount,
                rewards[i].tokenURI,
                ""
            );

            nftContract.handleRewardAddedToAsset(assetId, rewards[i].title, rewards[i].description, rewards[i].tokenAmount, rewards[i].individualPrice, rewardId);
        }

        emit RewardsAdded(assetId, rewards.length);
    }

    function getRewardsForAsset(uint256 assetId) public view returns (Reward[] memory) {
        Asset memory asset = nftContract.getAsset(assetId);
        return asset.rewards;
    }

}

