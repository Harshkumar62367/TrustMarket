// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";

contract TrustNFT is ERC721URIStorage, ERC721Royalty {
    using Counters for Counters.Counter;
    Counters.Counter private _trustIds;

    address payable TrustdataCreator;
    address TrustMarketAddress;
    string private _name;
    string private _symbol;
    string private _dataUrl; 
    string private _metadata;

    // Added code
    address public TrustDaoAddr;
    address public deployer;

    //Change trust dao address
    function setTrustDaoAddr(address _trustDaoAddr) public {
        require(deployer == msg.sender, "Only the contract deployer can change dao address");
        TrustDaoAddr = _trustDaoAddr;
    }

    //Check if the dao has permission to view dataurl or not
    //token id -> allowed or not for DAO
    mapping(uint256=>bool) private isallowed;

    function getAllowanceStatus(uint256 tokenid) public returns(bool){
        return isallowed[tokenid];
    }

    //Owner/ Buyer give dao access for dispute resolution (Flow: User gives dao access (Approve button)-> User files for fraud claim (File button))
    function setAllowanceStatus(uint256 tokenid, bool toSet) public {
        require(ownerOf(tokenid) == msg.sender, "Only owner can give dao access");
        isallowed[tokenid] = toSet;
    }

    // Added code

    

    constructor(
        address TrustMarketAddress_, 
        string memory dataUrl_,
        string memory metadata_
    ) 
    ERC721("TrustMarket", "TNFT") {
        TrustdataCreator = payable(msg.sender);
        TrustMarketAddress = TrustMarketAddress_;
        _dataUrl = dataUrl_;
        _metadata = metadata_;
        deployer = msg.sender;
    }

    modifier TrustDataCreator {
        require(msg.sender == TrustdataCreator, "Only the TrustMarket data creators can do this operation");
        _;
    }

    function TokenCreate(uint96 _TrustfeeNumerator) public TrustDataCreator returns (uint256) {
        _trustIds.increment();
        uint256 TrustnewItemId = _trustIds.current();
        _mint(msg.sender, TrustnewItemId);
        _setTokenURI(TrustnewItemId, _metadata);
        _setTokenRoyalty(TrustnewItemId, TrustdataCreator, _TrustfeeNumerator);
        setApprovalForAll(TrustMarketAddress, true);

        return TrustnewItemId;
    }

    function getTrustMarketAddress() public view returns (address) {
        return TrustMarketAddress;
    }

    function getTrustMetadata() public view returns (string memory) {
        return _metadata;
    }

    function setTokenRoyalty(uint256 trustId, address receiver, uint96 TrustfeeNumerator) external TrustDataCreator { // from OpenZepplin royalty contract
        _setTokenRoyalty(trustId, receiver, TrustfeeNumerator);
    }

    function resetTokenRoyalty(uint256 trustId) external TrustDataCreator {  // from OpenZepplin royalty contract
        _resetTokenRoyalty(trustId);
    }

    function getDataUrl(uint256 tokenId) public view returns (string memory) {
        require(ownerOf(tokenId) == msg.sender || msg.sender == TrustDaoAddr, "Only the Trust token owners can perform this operation"); 

        if(msg.sender == TrustDaoAddr){
            require(isallowed[tokenId] == true, "The dao has not been given access to the data");
        }

        return _dataUrl;
    }

    function _burn(uint256 trustId) internal virtual override(ERC721Royalty, ERC721URIStorage) {
        ERC721URIStorage._burn(trustId);
        _resetTokenRoyalty(trustId);
    }

    function tokenURI(uint256 trustId) public view virtual override(ERC721, ERC721URIStorage) returns (string memory) {
        return ERC721URIStorage.tokenURI(trustId);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721Royalty) returns (bool) {
        return ERC721Royalty.supportsInterface(interfaceId);
    }
}

    // Uploading dataset -> get ipfs link
    // URI contains link to the metadata json file
    // metadata.json file contains name, context, list of files, categories, ... 
    // metadata.json -> Upload to ipfs -> link
    // { "name": "", ""}
    // fetch api from link -> get json

    // _tokenURI = { "dataset": "link to ipfs url uploaded", "metadata": "link to ipfs json file" }
