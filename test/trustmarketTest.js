const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Trust market", function () {
  async function getBalance(address){
    let testbalance = await ethers.provider.getBalance(address);
    console.log(ethers.utils.formatEther(testbalance), "ethers");


  }

  it("Minimal viable trust market", async function () {
    const [owner,seller, buyer,member1,member2,member3] = await ethers.getSigners();

    //Deploying Trust Marketplace contract
    const TrustMarketplaceFactory = await ethers.getContractFactory("TrustMarketplace");
    const TrustMarketplace = await TrustMarketplaceFactory.connect(owner).deploy();
    await TrustMarketplace.deployed();
    console.log("Marketplace deployed: ", TrustMarketplace.address);

    //Deploying Trust NFT
    const TrustNFTFactory = await ethers.getContractFactory("TrustNFT");
    const TrustNFT = await TrustNFTFactory.connect(owner).deploy(TrustMarketplace.address);
    await TrustNFT.deployed();
    console.log("Trust NFT deployed: ",TrustNFT.address);

    //Deploying Trust DAO NFT
    const TrustDaoNFTFactory = await ethers.getContractFactory("TrustDaoNFT");
    const TrustDaoNFT = await TrustDaoNFTFactory.connect(owner).deploy();
    await TrustDaoNFT.deployed();
    console.log("Trust Dao NFT deployed: ",TrustDaoNFT.address);

    //Deploying Trust Escrow Contract
    const EscrowFactory = await ethers.getContractFactory("EscrowNC");
    const EscrowContract = await EscrowFactory.connect(owner).deploy(TrustMarketplace.address);
    await EscrowContract.deployed();
    console.log("Escrow contract deployed: ",EscrowContract.address);

    //Deploying DAO contract 
    const TrustDaoFactory = await ethers.getContractFactory("TrustDao");
    const TrustDaoContract = await TrustDaoFactory.connect(owner).deploy(TrustDaoNFT.address,TrustMarketplace.address,EscrowContract.address,TrustNFT.address);
    await TrustDaoContract.deployed();
    console.log("Trust Dao Contract deployed: ",TrustDaoContract.address);

    //Calling functions to set predefined addresses

    //1. Setting trust nft address in trust marketplace
    let tx = await TrustMarketplace.connect(owner).setTRUSTNFT(TrustNFT.address);
    await tx.wait();

    //2. Setting escrow address in trust market place
    tx = await TrustMarketplace.connect(owner).changeEscrow(EscrowContract.address);
    await tx.wait();
    
    //3. Setting trust dao address in trustmarket nft
    tx = await TrustNFT.connect(owner).setTrustDaoAddr(TrustDaoContract.address);
    await tx.wait();

    //4. Setting DAO address in Escrow contract.
    tx = await EscrowContract.connect(owner).changeDaoAddr(TrustDaoContract.address);
    await tx.wait();

    // Minimal viable trust market execution flow test

    //1. User mints dataset on trust NFT contract(Create Dataset button)
    const metadata = "bafybeihpcwmv6gmnb24twjli2d6eln4f3rygomch4uqtpffkhtfbirpjay";
    const dataurl = "https://ipfs.io/ipfs/bafybeichvqt6fjuyitlrz3424wcdhgtvt2qruvybq37v62khwbt53iks3m/mysecretName";
    
    //2. Mint Data set by seller
    tx = await TrustNFT.connect(seller).TokenCreate(100,metadata,dataurl)    
    await tx.wait();
    console.log("Data set has been minted as NFT: ");

    //Check the balance of seller (OPTIONAL)
    let balance = await TrustNFT.connect(seller).balanceOf(seller.address);
    console.log(balance);
    //Balance of seller should increase to 1
    expect(balance).to.equal(1,"Seller balance count is not equal to 1");
    
    //Fetch url of the id (OPTIONAL)
    let url = await TrustNFT.connect(seller).getDataUrl(1);
    console.log("Fetched url, ", url);
    expect(url).to.equal(dataurl,"Url not as expected");

    //Fetch Metadata CID (OPTIONAL)
    let meta = await TrustNFT.connect(seller).getTrustMetadata(1);
    console.log("Fetched url, ", meta);
    expect(meta).to.equal(metadata,"Metadata not as expected");

    // 

    //3.Seller creates item for listing   Finality time: 15 * 60 * 1000 (15 min) = 900000
    const trustlistingPrice = ethers.utils.parseEther("0.0025") 
    const price = ethers.utils.parseEther("0.1");
    tx = await TrustMarketplace.connect(seller).createTrustMarketItem(1,price,900000, {value:trustlistingPrice});
    let receipt = await tx.wait();
    let eventDetail = receipt.events?.filter((x) => {return x.event == "TrustItemCreated"});
    const trustId = eventDetail[0].args[0];
    const itemPrice = eventDetail[0].args[6];
    const tokenId = eventDetail[0].args[2];
    console.log("Trust ID: ",trustId);

    // console.log("Transaction: ",tx);

    // CHECKS (fetchTrustAuthorsCreations(address author))
    let creationlist = await TrustMarketplace.connect(seller).fetchTrustAuthorsCreations(seller.address);
    console.log("Author's creation fetched: ", creationlist);
    
    
      //Check if the new balance of the token is the MarketPlace Contract (OPTIONAL)
    let NFTowner = await TrustNFT.connect(seller).ownerOf(1);
    expect(NFTowner).to.equal(TrustMarketplace.address,"Marketplace has not gotten the NFT");

    //Get balance(OPTIONAL)
    getBalance(TrustMarketplace.address);
    
    //4. Buyer buys the Data set by paying for royalty amount and the  item price
    //4.1 Get royalty amount
      let [,royalty] =await  TrustNFT.royaltyInfo(tokenId, itemPrice);
      console.log("Royalty", royalty);

      //4.2 Buyers call market deal with item price + royalty
    tx = await TrustMarketplace.connect(buyer).trustMarketDeal(trustId,itemPrice,{value:itemPrice.add(royalty)});
    await tx.wait();

    // //Get balance(OPTIONAL)
    getBalance(TrustMarketplace.address);

    //Check if the buyer got the NFT or not(OPTIONAL)
    expect(await TrustNFT.ownerOf(tokenId)).to.equal(buyer.address,"The buyer has not got the NFT");

    //Check if the escrow contract got the money or not (OPTIONAL)
    expect(await ethers.provider.getBalance(EscrowContract.address)).to.equal(price);

    //5.Buyer files for fraud claim if he/she fids the dataset is fraud
      //5.1 Buyer gives Dao Access to data URL
    tx = await TrustNFT.connect(buyer).setAllowanceStatus(tokenId,true);
    await tx.wait();
      //5.2 Buyer files for fraud claim
    tx = await TrustDaoContract.connect(buyer).fraudClaim(trustId,"100 phone numbers");
    await tx.wait();

    //Get fraud claim list (Optional)
    let list = await TrustDaoContract.connect(buyer).getFraudClaimList();
    console.log("Fraud list:",list); 
    //Get fraud detail of that list (Optional)
    let fraudDetail = await TrustDaoContract.connect(buyer).getFraudClaimDetail(list[0]);
    console.log("Fraud detail :",fraudDetail);

    //6. Mint DAO access pass to get membership by 3 new address
    tx = await TrustDaoNFT.connect(member1).getDaoPass({value:ethers.utils.parseEther("1")});
    await tx.wait();

    tx = await TrustDaoNFT.connect(member2).getDaoPass({value:ethers.utils.parseEther("1")});
    await tx.wait();

    tx = await TrustDaoNFT.connect(member3).getDaoPass({value:ethers.utils.parseEther("1")});
    await tx.wait();

    //Check if all three address has DAO NFT or not
    expect(await TrustDaoNFT.balanceOf(member1.address)).to.equal(1);
    expect(await TrustDaoNFT.balanceOf(member2.address)).to.equal(1);
    expect(await TrustDaoNFT.balanceOf(member3.address)).to.equal(1);

    //Buyer balance before(OPTIONAL)
    getBalance(buyer.address);

    //7.Vote on fraud claim
    tx = await TrustDaoContract.connect(member1).voteFraudClaims(trustId,true);
    await tx.wait();
    tx = await TrustDaoContract.connect(member2).voteFraudClaims(trustId,true);
    await tx.wait();
    
    //Get fraud claim list (Optional)
    list = await TrustDaoContract.connect(buyer).getFraudClaimList();
    console.log("Fraud list:",list); 

    //8.Check if the money was returned to the buyer or not(OPTIONAL)
    getBalance(buyer.address);


    //9. Normal withdrawal Check
    // console.log("Seller balance: ");
    // getBalance(seller.address);

    // tx = await EscrowContract.connect(seller).withdraw(trustId);
    // await tx.wait();

    // getBalance(seller.address);

  });
});