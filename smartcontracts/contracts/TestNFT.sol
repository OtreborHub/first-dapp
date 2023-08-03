//SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract TestNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Optional mapping for example token URIs
    mapping(uint256 => string) private _exampleTokenURIs;

    // struct Card {
    //     string name;
    //     string description;
    //     uint8 ATK;
    //     uint8 DEF;
    // }

    // mapping(uint  => Card) cards;


    constructor() 
    ERC721("TestCard", "TSTC") {
        address owner = owner();
        initialAward(owner, "{'name':'ExampleNFT1','content':'example content 1','url':'assets/images/asset1.jpg'}");
        initialAward(owner, "{'name':'ExampleNFT2','content':'example content 2','url':'assets/images/asset1.jpg'}");
        initialAward(owner, "{'name':'ExampleNFT3','content':'example content 3','url':'assets/images/asset1.jpg'}");
        initialAward(owner, "{'name':'ExampleNFT4','content':'example content 4','url':'assets/images/asset1.jpg'}");
    }

    function initialAward(address player, string memory tokenURI) public onlyOwner() returns(uint256){
        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        _setExampleTokenURI(newItemId, tokenURI);

        _tokenIds.increment();
        return newItemId;
    }

    function awardItem(address player, string memory tokenURI) public returns (uint256)
    {
        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        _setTokenURI(newItemId, tokenURI);

        _tokenIds.increment();
        return newItemId;
    }

    function _setExampleTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_exists(tokenId), "ERC721URIStorage: URI set of nonexistent token");
        _exampleTokenURIs[tokenId] = _tokenURI;
    }

    function _exampleTokenURI(uint256 tokenId) public view virtual returns (string memory) {
        _requireMinted(tokenId);

        string memory _tokenURI = _exampleTokenURIs[tokenId];
        string memory base = _baseURI();

        // If there is no base URI, return the token URI.
        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }

        return super.tokenURI(tokenId);
    }

    function transferItem(address from, address to, uint256 tokenId) public {
        // bool cond1 = (from == ownerOf(tokenId)); 
        // bool cond2 = (to  != ownerOf(tokenId));
        require(from == msg.sender, "You don't own this token");
        require(to  != ownerOf(tokenId), "the reciever own this token yet");
        transferFrom(from, to, tokenId);
    }


}