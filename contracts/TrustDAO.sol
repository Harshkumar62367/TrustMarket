//SDPX-Liscence-Identifier: MIT
pragma solidity ^0.8.7;

//Trust DAO NFT
interface ITrustDaoNFT{
    function balanceOf(address owner) external view returns (uint256);
    function ownerCount()external view returns(uint256);

}

interface IEscrowNC{
    function getEscrowStatus(uint256 _trustId) external view  returns(address,address,bool,uint256,bool);
    function withdraw(uint256 _trustId) external returns(bool);
    function sellerSlashWithdraw(uint256 _trustId) external returns(bool);
    function buyerSlashWithdraw(uint256 _trustId) external returns(bool);
}

//Trust market NFT
interface ITrustNFT {
    function ownerOf(uint256 tokenid) external view returns (address);
    function getAllowanceStatus(uint256 tokenid) external returns(bool);
    //Retrieve the data url
    function getDataUrl(uint256 tokenId) external view returns (string memory);
}



contract TrustDao {

    address public trustDAONFTAddr;
    address public trustMarketAddr;
    address public escrowAddress;
    address public trustNFTAddress;
    
    constructor(address _nft, address _market, address _escrowAddress, address _trustNFT){
        trustDAONFTAddr = _nft;
        trustMarketAddr = _market;
        escrowAddress = _escrowAddress;
        trustNFTAddress = _trustNFT;
    }

    //Proposals

    struct proposals{
        string claim;
        uint256 tokenid;
        address buyer;
        address seller;
    }
    //Trust id => proposal
    mapping(uint256 => proposals) claimIdDetail;

    uint256 []claimList;

    //Store index of stored token for easier access
    mapping(uint256 => uint256) claimIndex;

    //Trust id => bool (whether claim is active or not)
    mapping(uint256 => bool) activeClaim;

    // vote counts
    struct votes{
        uint256 approve;
        uint256 reject;
    }
    mapping(uint256 => votes)  countedVotes;
    //Check if a member has already voted or not for a particular trust token id
    mapping(uint256 => mapping(address => bool)) hasvoted;

    //Incomplete votes that have expired
    uint256 []expiredUnvotedClaimList;

    //Expired unvotedclaimlist index (trustid => index)
    mapping(uint256 => uint256) expiredIndex;

    // Expired details
    struct expiredDetails{
        address seller;
        address buyer;
        uint256 approveCount;
        uint256 rejectCount;
        
    }
    mapping(uint256 =>expiredDetails) expiredData;


    //File for claim: (Flow: User gives dao access (Approve button)-> User files for fraud claim (File button))
    function fraudClaim(uint256 _trustId, string  memory claim) public returns(bool){

        //Get details
        (address seller, address buyer, bool isExpired,uint256 tokenId, bool isDeposited) = IEscrowNC(escrowAddress).getEscrowStatus(_trustId);
        address ownerOfNFT = ITrustNFT(trustNFTAddress).ownerOf(tokenId); //Check the current owner of NFT in dispute

        //Check if the buyer is the owner of NFT or not
        require(buyer == ownerOfNFT, "The caller has not bought the NFT");

        //Check if the escrow money has been deposited or not
        require(isDeposited == true, "The buyer has not deposited the money");

        //Check if the caller is buyer or not
        require(msg.sender == buyer, "Only buyer can claim for fraud");

        //Check if the finality time has expired or not
        require(isExpired == false, "The finality time has already expired. Cannot claim");

        //Check if the user has given DAO access to the NFT data or not
        bool isAllowed = ITrustNFT(trustNFTAddress).getAllowanceStatus(tokenId);

        require(isAllowed == true, "Dao has not been given access to DATA");
        
        //Store in array of proposals
        claimIdDetail[_trustId] = proposals(claim,tokenId,buyer,seller);

        //Pushing into the array of proposals
        claimList.push(_trustId);

        //Store claim index
        uint256 index = claimList.length - 1;
        claimIndex[_trustId] = index;

        //Activate claim
        activeClaim[_trustId] = true;

    }


    //Get total number of dao members
    function getMemberCount() public view returns(uint256){
        return ITrustDaoNFT(trustDAONFTAddr).ownerCount();
    }

    //vote on the latest fraud
    function voteFraudClaims(uint256 _trustId, bool _fraud) public returns(bool){

        //Check if the voter is a dao member or not
        require(ITrustDaoNFT(trustDAONFTAddr).balanceOf(msg.sender) >= 1,"The caller has to be a dao member to vote");
        //Check if the claim is active or not
        require(activeClaim[_trustId] == true, "You can't vote on inactive claim");
        //Check if the caller has already voted
        require(hasvoted[_trustId][msg.sender] == false,"You can only vote once");
        //Data fetch
        (address seller, address buyer, bool isExpired,uint256 tokenId, bool isDeposited) = IEscrowNC(escrowAddress).getEscrowStatus(_trustId);

        if(isExpired == true){

            //Store expired data
            expiredUnvotedClaimList.push(_trustId);
            expiredData[_trustId] = expiredDetails(seller,buyer,countedVotes[_trustId].approve, countedVotes[_trustId].reject);

            // Expired claimlist index
            uint256 index = expiredUnvotedClaimList.length - 1;
            expiredIndex[_trustId] = index;
            
            return false;
        }


        //Update votes
        if(_fraud == true){
            //Increment approve
            countedVotes[_trustId].approve = countedVotes[_trustId].approve + 1;
            hasvoted[_trustId][msg.sender] = true; //Updating the voted status
        }
        else{
            //Increment reject
            countedVotes[_trustId].reject = countedVotes[_trustId].reject + 1;
            hasvoted[_trustId][msg.sender] = true; //Updating the voted status
        }

        //Check if the 50% votes have been received or not
        uint256 memberCount = getMemberCount();
        uint256 approveCount = countedVotes[_trustId].approve;
        uint256 rejectCount = countedVotes[_trustId].reject;
        uint256 totalVotesReceived = approveCount + rejectCount;

        //If we get 50% or more votes
        if(totalVotesReceived * 2 >= memberCount){
            //Settle the dispute by calling escrow depending upon the vote count
            //If equal votes
            if(approveCount *2 == totalVotesReceived ){
                //Normal withdraw
                bool ret = IEscrowNC(escrowAddress).withdraw(_trustId);
                if(ret == false){
                    revert("Normal withdraw failed");
                }
            }
            else if( approveCount * 2 > totalVotesReceived){
                //The seller has been marked as fraud
                //Slashed withdraw
                bool ret = IEscrowNC(escrowAddress).sellerSlashWithdraw(_trustId);
                if(ret == false){
                    revert("Seller slash withdraw failed");
                }

            }
            else{
                //The buyer has been marked as fraud and the claim is fraud
                //Slashed buyer
                bool ret = IEscrowNC(escrowAddress).buyerSlashWithdraw(_trustId);
                if(ret == false){
                    revert("Buyer slash withdraw failed");
                }
            }

            //Clean data
            delete claimIdDetail[_trustId];
            delete claimList[claimIndex[_trustId]];
            delete claimIndex[_trustId];
            delete activeClaim[_trustId]; 

        }
        return true;
    }

    //Resolve the expired claim (Can be called by anyone mostly buyer or Seller or even DAO)
    function resolveExpiredClaim(uint256 _trustId) public {
        uint256 approve = expiredData[_trustId].approveCount;
        uint256 reject = expiredData[_trustId].rejectCount;
        

        //If approve is greater than reject than fraud claim approved slash seller
        if(approve >= reject){
                bool ret = IEscrowNC(escrowAddress).sellerSlashWithdraw(_trustId);
                if(ret == false){
                    revert("Seller slash withdraw failed");
                }

        }else{
            //Slash buyer for fraud claim
                bool ret = IEscrowNC(escrowAddress).buyerSlashWithdraw(_trustId);
                if(ret == false){
                    revert("Buyer slash withdraw failed");
                }

        }

        // Clean data
        delete claimIdDetail[_trustId];
        delete claimList[claimIndex[_trustId]];
        delete claimIndex[_trustId];
        delete activeClaim[_trustId]; 

        //Clean expired list
        delete expiredData[_trustId];
        delete expiredUnvotedClaimList[expiredIndex[_trustId]];
        delete expiredIndex[_trustId];
    }

    modifier onlyDaoMember{
        require(ITrustDaoNFT(trustDAONFTAddr).balanceOf(msg.sender) >= 1, "Only DAO member can call this function");
        _;
    }

    //Get expired unclaimed list
    function getExpiredUnclimedList()public view returns(uint256[] memory) {
        return expiredUnvotedClaimList;
    }

    //
    //Function to get all the active fraud claims
    function getFraudClaimList() public view returns(uint256[] memory) {
        return claimList;

    } 

    //Get detail of a fraud claim
    function getFraudClaimDetail(uint256 _trustId) public view returns(proposals memory){
        return claimIdDetail[_trustId];

    }

    //Get detail of a expired claim
    function getExpiredClaimDetail(uint256 _trustId) public view returns(expiredDetails memory){
        return expiredData[_trustId];

    }

    // Get the Data url to check for validity of proof
    function getDataLink(uint256 _trustId) public view onlyDaoMember returns(string memory){
        uint256 _tokenId = claimIdDetail[_trustId].tokenid;
        string memory datalink = ITrustNFT(trustNFTAddress).getDataUrl(_tokenId);
        return datalink;
    }

    //Receive function to receive balance
    receive() external payable{

    }
}