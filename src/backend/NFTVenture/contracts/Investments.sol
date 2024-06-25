// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.8.19;

import "./NFTVenture.sol";
import "./AssetStruct.sol";


contract Investments {
    NFTVenture private nftContract;
    address public Reward_tokens;
    address public supervisor;

    // Eventos
    event LogInvestment(
        address indexed investor,
        uint256 indexed assetId,
        uint256 indexed tokenId,
        uint256 tokenAmount,
        uint256 value
    );


    // Constructor
    constructor(address nftAddress, address reward_tokens) {
        nftContract = NFTVenture(nftAddress);
        supervisor = msg.sender;
        Reward_tokens = reward_tokens;
    }

    modifier onlySupervisor() {
        require(
            msg.sender == supervisor,
            "Only supervisor can call this function"
        );
        _;
    }

    modifier onlyAssetOwner(uint256 assetId) {
        require(
            nftContract.ownerOf(assetId) == msg.sender,
            "Caller is not the owner of the asset"
        );
        _;
    }


    ////////////////////////////////////////////////////////////////////////////////
    // Functions Investments //
    ////////////////////////////////////////////////////////////////////////////////


 function investAsset(uint256 assetId, uint256 rewardTokenId, uint256 tokenAmount) public payable {
        require(tokenAmount > 0, "Token amount must be greater than 0");
        require(nftContract.exists(assetId), "Asset does not exist");
        
        Asset memory asset = nftContract.getAsset(assetId);
        require(asset.status == ProjectStatus.Started, "Project is not in Started status");
        
        Reward memory reward;
        bool rewardFound = false;
        uint256 rewardIndex = 0;

        for (uint256 i = 0; i < asset.rewards.length; i++) {
            if (asset.rewards[i].rewardTokenId == rewardTokenId) {
                reward = asset.rewards[i];
                rewardFound = true;
                rewardIndex = i;
                break;
            }
        }

        require(rewardFound, "Reward does not exist for this asset");
        require(reward.availableTokens >= tokenAmount, "Not enough available tokens");
        require(msg.value == reward.individualPrice * tokenAmount, "Incorrect value sent");

        reward.availableTokens -= tokenAmount;
        nftContract.updateAssetReward(assetId, rewardIndex, reward.availableTokens);
        nftContract.addInvestment(assetId, msg.sender, msg.value);

        bool investorExists = false;
        address[] memory investors = nftContract.getAssetInvestors(assetId);

        for (uint256 i = 0; i < investors.length; i++) {
            if (investors[i] == msg.sender) {
                investorExists = true;
                break;
            }
        }

        if (!investorExists) {
            nftContract.addInvestor(assetId, msg.sender);
        }

        nftContract.updateInvestorTokens(assetId, msg.sender, rewardTokenId, tokenAmount);

        emit LogInvestment(
            msg.sender,
            assetId,
            rewardTokenId,
            tokenAmount,
            msg.value
        );
    }

    function getInvestmentDetails(uint256 assetId) public view returns (uint256 totalInvested, uint256 remainingFunding) {
        require(nftContract.exists(assetId), "Asset does not exist");
        Asset memory asset = nftContract.getAsset(assetId);
        totalInvested = nftContract.investmentReceived(assetId);
        remainingFunding = asset.price > totalInvested ? asset.price - totalInvested : 0;
    }

function getInvestmentHistory(uint256 assetId) public view returns (address[] memory investors, uint256[] memory amounts, uint256[][] memory tokenIds, uint256[][] memory tokenAmounts) {
    require(nftContract.exists(assetId), "Asset does not exist");

    investors = nftContract.getAssetInvestors(assetId);
    uint256 investorCount = investors.length;
    
    amounts = new uint256[](investorCount);
    tokenIds = new uint256[][](investorCount);
    tokenAmounts = new uint256[][](investorCount);

    for (uint256 i = 0; i < investorCount; i++) {
        address investor = investors[i];
        amounts[i] = nftContract.getInvestmentAmount(assetId, investor); 
        (tokenIds[i], tokenAmounts[i]) = nftContract.getInvestorTokens(assetId, investor);
    }
}


function getInvestmentsByAddress(address investor) public view returns (uint256[] memory assetIds, uint256[] memory amounts, uint256[][] memory tokenIds, uint256[][] memory tokenAmounts) {
    uint256[] memory investorInvestments = nftContract.getInvestorAssets(investor);
    uint256 investmentCount = investorInvestments.length;

    assetIds = new uint256[](investmentCount);
    amounts = new uint256[](investmentCount);
    tokenIds = new uint256[][](investmentCount);
    tokenAmounts = new uint256[][](investmentCount);

    for (uint256 i = 0; i < investmentCount; i++) {
        uint256 assetId = investorInvestments[i];
        amounts[i] = nftContract.getInvestmentAmount(assetId, investor); 
        (tokenIds[i], tokenAmounts[i]) = nftContract.getInvestorTokens(assetId, investor); 
        assetIds[i] = assetId;
    }
}

function getInvestmentsByAddressInAsset(uint256 assetId, address investor) public view returns (uint256 amount, uint256[] memory tokenIds, uint256[] memory tokenAmounts) {
    require(nftContract.exists(assetId), "Asset does not exist");
    
    amount = nftContract.getInvestmentAmount(assetId, investor); 
    (tokenIds, tokenAmounts) = nftContract.getInvestorTokens(assetId, investor); 

}



}