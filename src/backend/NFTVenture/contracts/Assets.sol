// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.8.19;

import "./NFTVenture.sol";
import "./AssetStruct.sol";

contract Assets {
    NFTVenture private nftContract;
    address public supervisor;

    // Eventos
    event LogInvestment(
        address indexed investor,
        uint256 indexed assetId,
        uint256 indexed tokenId,
        uint256 tokenAmount,
        uint256 value
    );

    event AssetCreated(
        uint256 indexed assetId,
        address indexed owner,
        string tokenURI
    );

    // Constructor
    constructor(address nftAddress) {
        nftContract = NFTVenture(nftAddress);
        supervisor = msg.sender;
    }

    modifier onlySupervisor() {
        require(
            msg.sender == supervisor,
            "Only supervisor can call this function"
        );
        _;
    }

    function addAsset(
        uint256 price,
        string memory author,
        string memory title,
        string memory description,
        uint256 projectEndDate,
        address to,
        string memory tokenURI,
        string memory mainPhoto,
        string[] memory secondaryPhotos,
        Category category
    ) public onlySupervisor {
        require(price != 0, "Price cannot be zero");
        require(
            projectEndDate >= block.timestamp,
            "Project end date should be in the future"
        );
        require(to != address(0), "Address cannot be zero");

        uint256 assetId = nftContract.getAssetsCount();

        Reward[] memory emptyRewards;
        Asset memory newAsset = Asset(
            assetId,
            price,
            author,
            title,
            description,
            block.timestamp,
            projectEndDate,
            emptyRewards,
            ProjectStatus.Started,
            address(0),
            mainPhoto,
            secondaryPhotos,
            category
        );
        nftContract._addAsset(assetId, newAsset, to);

        nftContract.mint(to, assetId, tokenURI);

        emit AssetCreated(assetId, to, tokenURI);

        nftContract.incrementAssetsCount();
    }

    function getAllAssets(
        ProjectStatus status
    ) public view returns (Asset[] memory, uint256[] memory, uint256[] memory) {
        uint256[] memory assetIds;

        if (status == ProjectStatus.Started) {
            assetIds = nftContract.getActiveAssets();
        } else if (status == ProjectStatus.Funded) {
            assetIds = nftContract.getFundedAssets();
        } else if (status == ProjectStatus.Failed) {
            assetIds = nftContract.getFailedAssets();
        } else if (status == ProjectStatus.Completed) {
            assetIds = nftContract.getCompletedAssets();
        } else {
            revert("Invalid status");
        }

        uint256 assetCount = assetIds.length;
        Asset[] memory assets = new Asset[](assetCount);
        uint256[] memory investmentAmounts = new uint256[](assetCount);
        uint256[] memory investorCounts = new uint256[](assetCount);

        for (uint256 i = 0; i < assetCount; i++) {
            assets[i] = nftContract.getAsset(assetIds[i]);
            investmentAmounts[i] = nftContract.getTotalInvestment(assetIds[i]);
            investorCounts[i] = nftContract.getTotalInvestors(assetIds[i]);
        }

        return (assets, investmentAmounts, investorCounts);
    }

    function getAllAssetsByCategory(
        ProjectStatus status,
        Category category
    ) public view returns (Asset[] memory) {
        uint256[] memory allAssetIds;

        if (status == ProjectStatus.Started) {
            allAssetIds = nftContract.getActiveAssets();
        } else if (status == ProjectStatus.Funded) {
            allAssetIds = nftContract.getFundedAssets();
        } else if (status == ProjectStatus.Failed) {
            allAssetIds = nftContract.getFailedAssets();
        } else if (status == ProjectStatus.Completed) {
            allAssetIds = nftContract.getCompletedAssets();
        } else {
            revert("Invalid status");
        }

        uint256[] memory categoryAssetIds = nftContract.getAssetsByCategory(
            category
        );
        uint256[] memory assetIds = new uint256[](categoryAssetIds.length);
        uint256 count = 0;

        for (uint256 i = 0; i < allAssetIds.length; i++) {
            assetIds[i] = allAssetIds[i];
        }

        Asset[] memory filteredAssets = new Asset[](categoryAssetIds.length);
        for (uint256 i = 0; i < categoryAssetIds.length; i++) {
            for (uint256 j = 0; j < assetIds.length; j++) {
                if (categoryAssetIds[i] == assetIds[j]) {
                    filteredAssets[count] = nftContract.getAsset(
                        categoryAssetIds[i]
                    );
                    count++;
                    break;
                }
            }
        }

        return filteredAssets;
    }

    function getAssetById(uint256 assetId) public view returns (Asset memory) {
        return nftContract.getAsset(assetId);
    }

    function getAssetsOfOwner(
        address owner
    ) public view returns (Asset[] memory) {
        uint256[] memory assetIds = nftContract.getAssetsOfOwner(owner);
        uint256 assetCount = assetIds.length;
        Asset[] memory assets = new Asset[](assetCount);

        for (uint256 i = 0; i < assetCount; i++) {
            assets[i] = nftContract.getAsset(assetIds[i]);
        }

        return assets;
    }

    function updateAsset(
        uint256 assetId,
        string memory mainPhoto,
        string[] memory secondaryPhotos,
        string memory description
    ) public {
        require(nftContract.exists(assetId), "Asset does not exist");
        require(
            nftContract.isApprovedOrOwner(msg.sender, assetId),
            "Not approved or owner"
        );

        Asset memory asset = nftContract.getAsset(assetId);

        asset.mainPhoto = bytes(mainPhoto).length > 0
            ? mainPhoto
            : asset.mainPhoto;
        asset.secondaryPhotos = secondaryPhotos.length > 0
            ? secondaryPhotos
            : asset.secondaryPhotos;
        asset.description = bytes(description).length > 0
            ? description
            : asset.description;

        nftContract.updateAsset(assetId, asset);
    }
}
