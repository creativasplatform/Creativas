// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.8.19;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FCTVToken is ERC1155, ERC1155Burnable, Ownable {
    string public name;
    string public symbol;
    mapping(uint256 => string) private _tokenURIs;

    constructor(string memory baseURI) ERC1155(baseURI) {
        name = "Fractional CTV Tokens";
        symbol = "FCTVT";
    }

    function setURI(uint256 tokenId, string memory tokenURI) public onlyOwner {
        _tokenURIs[tokenId] = tokenURI;
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        return _tokenURIs[tokenId];
    }

    function mint(
        address to,
        uint256 id,
        uint256 amount,
        string memory tokenURI,
        bytes memory data
    ) public onlyOwner {
        _mint(to, id, amount, data);
        _tokenURIs[id] = tokenURI;
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        string[] memory tokenURIs,
        bytes memory data
    ) public onlyOwner {
        require(
            ids.length == tokenURIs.length,
            "ERC1155: ids and uris length mismatch"
        );
        _mintBatch(to, ids, amounts, data);
        for (uint256 i = 0; i < ids.length; i++) {
            _tokenURIs[ids[i]] = tokenURIs[i];
        }
    }
}
