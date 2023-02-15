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

    function getDataUrl(uint256 trustId) public view returns (string memory) {
        require(ownerOf(trustId) == msg.sender, "Only the Trust token owners can perform this operation"); 
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
