// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

import "./TrustNFT.sol";


interface EscrowContract{
    function deposit(uint256 _tokenId, uint256 _price, address _seller, uint256 _agreedTimeWindow, address _buyer,uint256 _trustId) external payable returns(bool);

}

contract TrustMarketplace is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _trustIds;
    Counters.Counter private _itemsSold;
    Counters.Counter private _itemsDeleted;

    address payable owner; // Owner of marketplace
    uint256 trustlistingPrice = 0.0025 ether; // price to list NFT
    uint256 trusttransferPrice = 0.0025 ether; // price to transfer NFT to other person
    address escrowContractAddress = address(0);

    // Added code
    //Address (Buyer/Seller) => reputation
    //After successfull trade reputation of both seller and buyer goes up
    // After a disputed trade fraud party's reputation get's slashed
    // If reputation reaches -2 (the address is banned from accessing the contract)
    mapping(address=>uint256) reputation;

    //Increase reputation
    function increaseReputation(address user) public {
        reputation[user] = reputation[user] + 1;
    }
    //Decrease reputation
    function decreaseReputation(address user) public{
        reputation[user] = reputation[user] - 1;
    }

    //Get reputation of a user
    function getReputation(address user)public returns(uint256){
        return reputation[user];
    }
    // Added code

    //Change escrow contract
    function changeEscrow(address _escrowAddr) public {
        escrowContractAddress = _escrowAddr;
    }


    constructor() {
        owner = payable(msg.sender); // Owner of the contract to the one who deployed
    }

    struct TrustMarketItem {
        uint256 trustId;
        address trustnftContract;
        uint256 tokenId;
        address payable creator;
        address payable seller;
        address payable owner;
        uint256 price;
        bool isSold;
        uint256 finalityTime;
    }

    mapping(uint256 => TrustMarketItem) idToMarketItem;

    event TrustItemCreated(
        uint256 indexed trustId,
        address indexed trustnftContract,
        uint256 indexed tokenId,
        address creator,
        address seller,
        address owner,
        uint256 price
    );

    event TrustListedProduct(
        uint256 indexed trustId
    );

    event TrustUpdateProduct(
        uint256 indexed trustId,
        uint256 indexed oldPrice,
        uint256 indexed newPrice
    );

    event TrustProductSold(
        uint256 indexed trustId,
        address indexed trustnftContract,
        uint256 indexed tokenId,
        address creator,
        address seller,
        address owner,
        uint256 price
    );

    event TrustItemDeleted(
        uint256 trustId
    );

    modifier onlyTrustMarketOrProductOwner(uint256 id){
        if (idToMarketItem[id].owner != address(0)) {
            require(idToMarketItem[id].owner == msg.sender);
        } 
        else {
            require(idToMarketItem[id].seller == msg.sender || msg.sender == owner);
        }
        _;
    }

    modifier onlyTrustItemOwner(uint256 id) {
        require(idToMarketItem[id].owner == msg.sender, "Only Trust item owner can do this operation");
        _;
    }

    modifier onlyTrustSeller(uint256 id) {
        require(
            idToMarketItem[id].owner == address(0) && idToMarketItem[id].seller == msg.sender, "Only Trust product seller can do this operation");
        _;
    }



    function getTrustListingPrice() public view returns (uint256) {
        return trustlistingPrice;
    }

    function createTrustMarketItem(address trustnftContract, uint256 tokenId, uint256 price,uint256 finalityTime) public payable nonReentrant {
        require(price > 0, "Price must be greater than zero");
        require (msg.value == trustlistingPrice, "Listing fee required to create Market item");

        _trustIds.increment();
        uint256 trustId = _trustIds.current();
        idToMarketItem[trustId] = TrustMarketItem(
            trustId,
            trustnftContract,
            tokenId,
            payable(msg.sender),
            payable(msg.sender),
            payable(address(0)),
            price,
            false,
            finalityTime
        );

        IERC721(trustnftContract).transferFrom(msg.sender, address(this), tokenId);

        emit TrustItemCreated(
            trustId,
            trustnftContract,
            tokenId,
            msg.sender,
            msg.sender,
            address(0),
            price
        );
    } 

    function updateTrustMarketItemsPrice(uint256 id, uint256 newPrice) public payable onlyTrustSeller(id) {
        TrustMarketItem storage item = idToMarketItem[id];
        uint256 oldPrice = item.price;
        item.price = newPrice;

        emit TrustUpdateProduct(id, oldPrice, newPrice);
    }

    function trustMarketDeal(address trustnftContract, uint256 trustId, uint256 price) public payable nonReentrant {
        uint256 itemPrice = idToMarketItem[trustId].price;
        uint256 tokenId = idToMarketItem[trustId].tokenId;
        address _seller = idToMarketItem[trustId].seller; //Added code
        uint256 _finalityTime = idToMarketItem[trustId].finalityTime; //Added code
        bool _isSold = idToMarketItem[trustId].isSold; //Added code


        require(itemPrice == price, "Please give the required price to complete the purchase");
        require(_isSold == false,"Data already purchased");  //Added code

        // Added code
    
        require(msg.value >= price, "Insufficient amount transferred");
        // The sent money is transferred to the escrow contract
        (bool sent,) = EscrowContract(escrowContractAddress).deposit{value:msg.value}(tokenId, price,_seller,_finalityTime,msg.sender,trustId);
        require(sent == true, "Transfer to escrow contract failed");

        // Added code


        // idToMarketItem[trustId].seller.transfer(price); //Commented

        (address receiver, uint256 royaltyAmount) = ERC2981(trustnftContract).royaltyInfo(tokenId, price); // The buyer pays the royalty fee to the owner of the NFT
        payable(receiver).transfer(royaltyAmount);

        IERC721(trustnftContract).transferFrom(address(this), msg.sender, tokenId);
        idToMarketItem[trustId].owner = payable(msg.sender);
        idToMarketItem[trustId].isSold = true;
        _itemsSold.increment();
        
        payable(owner).transfer(trustlistingPrice); // Regards the marketplace with listingPrice

        emit TrustProductSold(
            idToMarketItem[trustId].trustId,
            idToMarketItem[trustId].trustnftContract,
            idToMarketItem[trustId].tokenId,
            idToMarketItem[trustId].creator,
            idToMarketItem[trustId].seller,
            payable(msg.sender),
            idToMarketItem[trustId].price
        );
    }
    
    function TrustItemPutToResell(address trustnftContract, uint256 trustId, uint256 newPrice) public payable onlyTrustItemOwner(trustId) {
        uint256 tokenId = idToMarketItem[trustId].tokenId;
        require(newPrice > 0, "Price must be greater than 0");
        require(msg.value == trustlistingPrice, "Price must be equal to listing price");

        IERC721(trustnftContract).transferFrom(msg.sender, address(this), tokenId);

        address payable prevOwner = idToMarketItem[trustId].owner;
        idToMarketItem[trustId].owner = payable(address(0));
        idToMarketItem[trustId].seller = prevOwner;
        idToMarketItem[trustId].price = newPrice;
        idToMarketItem[trustId].isSold = false;
        _itemsSold.decrement();

        emit TrustListedProduct(trustId);
    }

    function fetchSingleItem(uint256 id) public view returns (TrustMarketItem memory) {
        return idToMarketItem[id];
    }
    
    function fetchTrustMarketItems() public view returns (TrustMarketItem[] memory) {
        uint256 itemsCount = _trustIds.current();
        uint256 unsoldItemsCount = _trustIds.current() - _itemsSold.current() - _itemsDeleted.current();
        uint256 currentIndex = 0;

        TrustMarketItem[] memory items = new TrustMarketItem[](unsoldItemsCount);
        for (uint256 i = 0; i < itemsCount; i++) {
            if (
                idToMarketItem[i + 1].owner == address(0) &&
                idToMarketItem[i + 1].isSold == false &&
                idToMarketItem[i + 1].tokenId != 0
            ) {
                uint256 currentId = i + 1;
                TrustMarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return items;
    }


    function fetchTrustNFTs() public view returns (TrustMarketItem[] memory) {
        uint256 totalItemCount = _trustIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        TrustMarketItem[] memory items = new TrustMarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                TrustMarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchTrustAuthorsCreations(address author) public view returns (TrustMarketItem[] memory) {
        uint256 totalItemCount = _trustIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].creator == author && !idToMarketItem[i + 1].isSold) {
                itemCount += 1;
            }
        }

        TrustMarketItem[] memory items = new TrustMarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].creator == author && !idToMarketItem[i + 1].isSold) {
                uint256 currentId = i + 1;
                TrustMarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchNFTsByAddress(address addr) public view returns (TrustMarketItem[] memory) {
        uint256 totalItemCount = _trustIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == addr) {
                itemCount += 1;
            }
        }

        TrustMarketItem[] memory items = new TrustMarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == addr) {
                uint256 currentId = i + 1;
                TrustMarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    

}
