// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol";

library StructLib {

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

}

interface Datamarket {

    function fetchSingleItem(uint256) external view returns (StructLib.TrustMarketItem memory);
    function increaseReputation(address user) external;
    function decreaseReputation(address user) external;
    function getReputation(address user)external view returns(uint256);
}

contract EscrowNC{
    using SafeMath for uint256;

    //Owner of the contract (Temoporary)
    address public owner;
    address public dataMarket; //Data market contract address
    address public daoContract; //Contract of the dispute dao



    constructor(address _dataMarket, address _daoContract){
        owner = msg.sender;
        dataMarket = _dataMarket;
        daoContract = _daoContract;
    }

    //Change the owner
    function changeOwner(address _newOwner)public {
        require(msg.sender == owner,"Only the owner can change the owner");
        owner = _newOwner;
    }
 
    //Calculate % for fee and slashing
    function calculatePercentage(uint256 amount, uint256 basisPoint) public pure returns(uint256){
        return (amount*basisPoint)/10000; //amount in wei
    }

    //Item detail
    struct itemDetail{
        uint256 price;  //Price or value
        address seller;
        uint256 timeWindow; //Unix time
        uint256 currentBlockTime; //Unix timestamp
        address buyer;
        uint256 amountDeposited;
        uint256 _tokenId;
    }

    //Item escrow status
    struct itemStatus{
        bool deposited;
        uint256 _tokenId;    
    }
    
    // Trust id -> itemdetail
    mapping(uint256 => itemDetail) public escrowData; 

    //Trust id-> itemStatus
    mapping(uint256 => itemStatus) public escrowStatus;

    //Deposit tokens that the seller is supposed to receive if the data lives up to the standard after the finality time

    // When trade execution flow: Buyer calls trustMarketDeal function(Buy button ) -> money is sent from buyer to datamarket to escrow->
    // -> Datamarketplace contract sends nft to buyer
    function deposit(uint256 _tokenId, uint256 _price,address _seller, uint256 _agreedTimeWindow,address _buyer,uint256 _trustId) public payable returns(bool){

        require(msg.value >= _price, "The deposited amount is smaller than the listed price");
        require(msg.sender == dataMarket, "Only data market can call this function");

        //Saving data
        escrowData[_trustId] = itemDetail(_price,_seller,_agreedTimeWindow,block.timestamp,_buyer,msg.value,_tokenId);

        escrowStatus[_trustId] = itemStatus(true,_tokenId);
        return true;
    }

    //Function to return deposited amount (No dispute withdrawal)
    function withdraw(uint256 _trustId) public returns(bool){
        address seller = escrowData[_trustId].seller;
        uint256 finalityTime = escrowData[_trustId].timeWindow;
        uint256 startTime = escrowData[_trustId].currentBlockTime;
        uint256 endTime = block.timestamp;
        uint256 ethToTransfer = escrowData[_trustId].amountDeposited; //Amount to be transferred to seller if there is no dispute
        address buyer = escrowData[_trustId].buyer;

        require(msg.sender == seller, "Only the seller can withdraw");
        require(escrowStatus[_trustId].deposited == true, "Cannot withdraw without depositing");
        require(endTime-startTime >= finalityTime, "The finality time has not expired");


        //Transfer deposited amount to the seller
        payable(seller).transfer(ethToTransfer);
        
        //Increment buyer and seller reputation
        Datamarket(dataMarket).increaseReputation(seller);
        Datamarket(dataMarket).increaseReputation(buyer);

        //Delete records
        delete(escrowData[_trustId]);
        delete(escrowStatus[_trustId]);

        return true;
    }

    //Function to withdraw if fraud by seller
    function sellerSlashWithdraw(uint256 _trustId) public returns(bool){

        address seller = escrowData[_trustId].seller;
        uint256 finalityTime = escrowData[_trustId].timeWindow;
        uint256 startTime = escrowData[_trustId].currentBlockTime;
        uint256 endTime = block.timestamp;
        uint256 ethToTransfer = escrowData[_trustId].amountDeposited; //Amount to be transferred to seller if there is no dispute
        address buyer = escrowData[_trustId].buyer;

        require(msg.sender == daoContract, "Only the dao contract can withdraw");
        require(escrowStatus[_trustId].deposited == true, "Cannot withdraw without depositing");
        require(endTime-startTime >= finalityTime, "The finality time has not expired");

        //Slash seller reputation
        Datamarket(dataMarket).decreaseReputation(seller);

        //Calculate 2% fee
        uint256 daoFee = calculatePercentage(ethToTransfer,200);
        //Take dao fee and return amount to the user
        uint256 refundAmount = ethToTransfer - daoFee;

        //Transfer refund amount to the buyer
        payable(buyer).transfer(refundAmount);

        //Transfer dao fee to the DAO
        payable(daoContract).transfer(daoFee);

        //Delete records
        delete(escrowData[_trustId]);
        delete(escrowStatus[_trustId]);

        return true;
    }

    //Function to withdraw if fraud by buyer
    function buyerSlashWithdraw(uint256 _trustId) public returns(bool){

        address seller = escrowData[_trustId].seller;
        uint256 finalityTime = escrowData[_trustId].timeWindow;
        uint256 startTime = escrowData[_trustId].currentBlockTime;
        uint256 endTime = block.timestamp;
        uint256 ethToTransfer = escrowData[_trustId].amountDeposited; //Amount to be transferred to seller if there is no dispute
        address buyer = escrowData[_trustId].buyer;

        require(msg.sender == daoContract, "Only the dao contract can withdraw");
        require(escrowStatus[_trustId].deposited == true, "Cannot withdraw without depositing");
        require(endTime-startTime >= finalityTime, "The finality time has not expired");

        //Slash buyer reputation
        Datamarket(dataMarket).decreaseReputation(buyer);

        //Transfer funds to the seller
        payable(seller).transfer(ethToTransfer);

        //Delete records
        delete(escrowData[_trustId]);
        delete(escrowStatus[_trustId]);

        return true;
    }

}