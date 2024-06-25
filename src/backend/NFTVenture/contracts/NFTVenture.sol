// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "./AssetStruct.sol";

contract NFTVenture is
    ERC721,
    ERC721Enumerable,
    ERC721URIStorage,
    Pausable,
    Ownable,
    ERC721Burnable
{
    // Assets
    uint256 public assetsCount;
    mapping(uint256 => Asset) public assetMap;
    mapping(uint256 => bool) public assetExists;

    mapping(address => uint256[]) public ownerToAssets;

    mapping(uint256 => address) public assetApprovals;
    mapping(uint256 => address) public assetOwner;
    mapping(address => uint256) public ownedAssetsCount;

    // State-based Asset IDs
    uint256[] public activeAssets;
    uint256[] public fundedAssets;
    uint256[] public failedAssets;
    uint256[] public completedAssets;

    // Category-based Asset IDs
    mapping(Category => uint256[]) public categoryAssets;

    // Investments
    mapping(uint256 => mapping(address => uint256)) public investmentAmountOf;
    mapping(uint256 => uint256) public investmentReceived;
    mapping(uint256 => address[]) public assetInvestors;
    mapping(uint256 => bool) public isTransferAllowed;
    mapping(uint256 => bool) public isRefundingAllowed;
    mapping(uint256 => uint256) public investmentRefunded;
    mapping(uint256 => mapping(address => uint256)) public pendingReturns;
    mapping(uint256 => mapping(address => mapping(uint256 => uint256))) public investorTokens;

    mapping(address => uint256[]) public investorAssets;

    // Constructor
    constructor() ERC721("FractionalCTV", "FCTV") {}

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function _baseURI() internal pure override returns (string memory) {
        return "";
    }

    function transfer(
        address recipient,
        uint256 amount
    ) public virtual returns (bool) {
        _transfer(_msgSender(), recipient, amount);
        return true;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) whenNotPaused {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    modifier isNFTOwner(uint256 assetId) {
        require(msg.sender == ownerOf(assetId));
        _;
    }

    function balanceOf() public view returns (uint256) {
        require(
            msg.sender != address(0),
            "ERC721: balance query for the zero address"
        );
        return ownedAssetsCount[msg.sender];
    }

    function ownerOf(
        uint256 assetId
    ) public view override(ERC721, IERC721) returns (address) {
        address owner = assetOwner[assetId];
        require(owner != address(0), "NoAssetExists");
        return owner;
    }

    function approve(
        address to,
        uint256 assetId
    ) public override(ERC721, IERC721) {
        address owner = ownerOf(assetId);
        require(to != owner, "CurrentOwnerApproval");
        require(msg.sender == owner, "NotTheAssetOwner");
        assetApprovals[assetId] = to;
        emit Approval(owner, to, assetId);
    }

    function getApproved(
        uint256 assetId
    ) public view override(ERC721, IERC721) returns (address) {
        require(
            _exists(assetId),
            "ERC721: approved query for nonexistent token"
        );
        return assetApprovals[assetId];
    }

    function clearApproval(uint256 assetId, address approved) public {
        if (assetApprovals[assetId] == approved) {
            assetApprovals[assetId] = address(0);
        }
    }

    function mint(address to, uint256 assetId, string memory asseturi) public {
        require(to != address(0), "ZeroAddressMiniting");
        _safeMint(to, assetId);
        _setTokenURI(assetId, asseturi);
        emit Transfer(address(0), to, assetId);
    }

    function exists(uint256 assetId) public view returns (bool) {
        return assetExists[assetId];
    }

    function isApprovedOrOwner(
        address spender,
        uint256 assetId
    ) external view returns (bool) {
        require(
            exists(assetId),
            "ERC721: operator query for nonexistent token"
        );
        address owner = ownerOf(assetId);
        return (spender == owner || getApproved(assetId) == spender);
    }

    function _addAsset(
        uint256 assetId,
        Asset memory asset,
        address to
    ) external {
        assetMap[assetId] = asset;
        assetOwner[assetId] = to;
        ownedAssetsCount[to]++;
        ownerToAssets[to].push(assetId);
        assetExists[assetId] = true;
        activeAssets.push(assetId);
        categoryAssets[asset.category].push(assetId);
    }

    function getAsset(uint256 assetId) public view returns (Asset memory) {
        return assetMap[assetId];
    }

    function updateAsset(uint256 assetId, Asset memory asset) public {
        assetMap[assetId] = asset;
    }

    function getAssetsCount() public view returns (uint256) {
        return assetsCount;
    }

    function incrementAssetsCount() public {
        assetsCount++;
    }

    function getAssetsOfOwner(
        address owner
    ) public view returns (uint256[] memory) {
        return ownerToAssets[owner];
    }

     function updateAssetReward(
        uint256 assetId,
        uint256 rewardIndex,
        uint256 newAvailableTokens
    ) external {
        require(
            rewardIndex < assetMap[assetId].rewards.length,
            "Invalid reward index"
        );
        assetMap[assetId]
            .rewards[rewardIndex]
            .availableTokens = newAvailableTokens;
    }

    function handleRewardAddedToAsset(
        uint256 assetId,
        string memory title,
        string memory description,
        uint256 tokenAmount,
        uint256 individualPrice,
        bytes32 rewardId
    ) external {
        Asset storage asset = assetMap[assetId];
        asset.rewards.push(
            Reward({
                title: title,
                description: description,
                tokenAmount: tokenAmount,
                individualPrice: individualPrice,
                availableTokens: tokenAmount,
                rewardTokenId: uint256(rewardId)
            })
        );
    }

    function updateRewardTokenAddress(
        uint256 assetId,
        address rewardTokenAddress
    ) external {
        assetMap[assetId].rewardTokenAddress = rewardTokenAddress;
    }

    function addInvestment(
        uint256 assetId,
        address investor,
        uint256 amount
    ) external {
        investmentAmountOf[assetId][investor] += amount;
        investmentReceived[assetId] += amount;
    }

    function addInvestor(uint256 assetId, address investor) external {
        assetInvestors[assetId].push(investor);
        investorAssets[investor].push(assetId);
    }

    function getAssetInvestors(
        uint256 assetId
    ) external view returns (address[] memory) {
        return assetInvestors[assetId];
    }

    function getInvestorAssets(
        address investor
    ) external view returns (uint256[] memory) {
        return investorAssets[investor];
    }
 function getInvestorTokens(uint256 assetId, address investor) public view returns (uint256[] memory, uint256[] memory) {
    Asset memory asset = assetMap[assetId];
    uint256 rewardCount = asset.rewards.length;

    uint256[] memory tokenIds = new uint256[](rewardCount);
    uint256[] memory tokenAmounts = new uint256[](rewardCount);

    for (uint256 i = 0; i < rewardCount; i++) {
        uint256 tokenId = asset.rewards[i].rewardTokenId;
        tokenIds[i] = tokenId;
        tokenAmounts[i] = investorTokens[assetId][investor][tokenId];
    }

    return (tokenIds, tokenAmounts);
}

    function getInvestmentAmount(uint256 assetId, address investor) public view returns (uint256) {
        return investmentAmountOf[assetId][investor];
    }

    function updateInvestorTokens(uint256 assetId, address investor, uint256 tokenId, uint256 tokenAmount) external {
        investorTokens[assetId][investor][tokenId] = tokenAmount;
    }

    function allowTransfers(uint256 assetId, bool allowed) external {
        isTransferAllowed[assetId] = allowed;
    }

    function allowRefunding(uint256 assetId, bool allowed) external {
        isRefundingAllowed[assetId] = allowed;
    }

    function updatePendingReturns(uint256 assetId, address investor, uint256 amount) external {
        pendingReturns[assetId][investor] = amount;
    }

    function updateInvestmentRefunded(uint256 assetId, uint256 amount) external {
        investmentRefunded[assetId] = amount;
    }

    function getActiveAssets() external view returns (uint256[] memory) {
        return activeAssets;
    }

    function getFundedAssets() external view returns (uint256[] memory) {
        return fundedAssets;
    }

    function getFailedAssets() external view returns (uint256[] memory) {
        return failedAssets;
    }

    function getCompletedAssets() external view returns (uint256[] memory) {
        return completedAssets;
    }

    function getAssetsByCategory(Category category) external view returns (uint256[] memory) {
        return categoryAssets[category];
    }
}
