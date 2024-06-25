// SPDX-License-Identifier: MIT
/**
 * @file reclamarFrac.sol
 * @autor A.Castellano <alcamo93@suissistemas.com>
 * @date created 1th Jul 2022
 * @date last modified 11th Jul 2022
 */

pragma solidity >=0.7.0 <=0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract reclamarFrac {
    using SafeMath for uint256;

    address payable public ownerAddress;
    address public nftAddress;
    address public tokenAddress;
    enum ClaimState {
        initiated,
        accepting,
        closed
    }
    ClaimState public claimState;
    uint256 public funds;
    uint256 public supply;
    event SupplyDetails(uint256 supply);
    event TokenAddressDetails(address tokenAddress);
    event FundsDetails(uint256 funds);
    event ClaimStateDetails(ClaimState claimState);
    event Claimed(address reclamante, uint256 cantidad);

    event funded();
    //este contrato de reclamar fracciones solo debe permitirse si la persona que lo inició posee este token NFT
    //this claims contract should only be allowed if the guy who started it owns this NFT token
    modifier isOwnerOfNFT(
        address _nftAddress,
        address _ownerAddress,
        uint256 _tokenID
    ) {
        require(ERC721(_nftAddress).ownerOf(_tokenID) == _ownerAddress);
        _;
    }

    modifier condition(bool _condition) {
        require(_condition);
        _;
    }
    modifier onlyOwner() {
        require(msg.sender == ownerAddress);
        _;
    }

    modifier inClaimState(ClaimState _state) {
        require(claimState == _state);
        _;
    }

    modifier correctToken(address _token) {
        require(_token == tokenAddress);
        _;
    }

    constructor(
        address _nftAddress,
        uint256 _tokenID
    ) isOwnerOfNFT(_nftAddress, msg.sender, _tokenID) {
        nftAddress = _nftAddress;
        ownerAddress = payable(msg.sender);
        claimState = ClaimState.initiated;
    }

    function getClaimState() public view returns (ClaimState) {
    return claimState;
}


    function fund(
        address _token
    ) public payable inClaimState(ClaimState.initiated) onlyOwner {
        funds = msg.value; //cantidad agregada para permitir que se hagan reclamos //amount added to allow claims to be made
        tokenAddress = _token; //dirección del token aceptable //address of acceptable token
        claimState = ClaimState.accepting; //establece en estado aceptación//set to accepting status

        supply = ERC20(_token).totalSupply().div(1000000000000000000);

    emit SupplyDetails(supply);
    emit TokenAddressDetails(tokenAddress);
    emit FundsDetails(funds);
    emit ClaimStateDetails(claimState);

        emit funded();
    }

 
function claim(address _token, uint256 tokenAmount) public correctToken(_token) {
    // Convierte supply a wei
    uint256 supplyInWei = supply.mul(1e18);

    // Calcula la cantidad de ETH a transferir en base al tokenAmount
    uint256 cantidad = tokenAmount.mul(funds).div(supplyInWei);

    // Asegúrate de que el contrato tenga suficientes fondos
    require(address(this).balance >= cantidad, "Fondos insuficientes en el contrato");

    // Transfiere la cantidad calculada de ETH al remitente
    payable(msg.sender).transfer(cantidad);


    // Quema la cantidad de tokens del remitente
    ERC20Burnable(tokenAddress).burnFrom(msg.sender, tokenAmount);


    // Emite un evento para indicar que se ha realizado una reclamación
    emit Claimed(msg.sender, cantidad);

    //ok, fully claimed. Close this contract
        if (ERC20Burnable(_token).totalSupply() == 0){
            claimState = ClaimState.closed;
        }
}
}