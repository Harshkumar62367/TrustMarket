//SPDX-Liscence-Identifier:MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TrustDaoNFT is ERC721URIStorage{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    
    string public tokenURI = "https://ipfs.io/ipfs/bafkreig3nidfxbhkfjqychb4bb7yn7x5odfs7bsxasnngfn44mqeieyyn4";

    constructor() ERC721("TrustDaoNFT","TNFT"){}

    function getDaoPass() public payable returns(uint256){
        require(balanceOf(msg.sender) == 0, "You can't get more than one access pass to the DAO");
        require(msg.value == 1 ether,"You need to pay 1 FIL to mint the NFT");

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender,newItemId);
        _setTokenURI(newItemId,tokenURI);

        _tokenIds.increment();
        return newItemId;

    }






}