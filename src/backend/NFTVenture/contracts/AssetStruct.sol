// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.8.19;

enum ProjectStatus {
    Started,
    Funded,
    Failed,
    Completed
}

enum Category {
    Technology,
    Gaming,
    Music,
    Movies,
    Art
}

struct Reward {
    string title;
    string description;
    uint256 tokenAmount;
    uint256 individualPrice;
    uint256 availableTokens;
    uint256 rewardTokenId;
}

struct NewReward {
    string tokenURI;
    string title;
    string description;
    uint256 tokenAmount;
    uint256 individualPrice;
}

struct Asset {
    uint256 assetId;
    uint256 price;
    string author;
    string title;
    string description;
    uint256 projectStartDate;
    uint256 projectEndDate;
    Reward[] rewards;
    ProjectStatus status;
    address rewardTokenAddress;
    string mainPhoto;
    string[] secondaryPhotos;
    Category category;
}
