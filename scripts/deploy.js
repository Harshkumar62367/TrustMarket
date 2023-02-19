// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");
require('dotenv').config();

const owner = new hre.ethers.Wallet(process.env.PRIVATE_KEY,hre.ethers.provider);

async function main() {
  console.log("Deploying contracts to testnet");

    //Deploying Trust Marketplace contract
    const TrustMarketplaceFactory = await hre.ethers.getContractFactory("TrustMarketplace");
    const TrustMarketplace = await TrustMarketplaceFactory.connect(owner).deploy();
    await TrustMarketplace.deployed();
    console.log("Marketplace deployed: ", TrustMarketplace.address);

    //Deploying Trust NFT
    const TrustNFTFactory = await hre.ethers.getContractFactory("TrustNFT");
    const TrustNFT = await TrustNFTFactory.connect(owner).deploy(TrustMarketplace.address);
    await TrustNFT.deployed();
    console.log("Trust NFT deployed: ",TrustNFT.address);

    //Deploying Trust DAO NFT
    const TrustDaoNFTFactory = await hre.ethers.getContractFactory("TrustDaoNFT");
    const TrustDaoNFT = await TrustDaoNFTFactory.connect(owner).deploy();
    await TrustDaoNFT.deployed();
    console.log("Trust Dao NFT deployed: ",TrustDaoNFT.address);

    //Deploying Trust Escrow Contract
    const EscrowFactory = await hre.ethers.getContractFactory("EscrowNC");
    const EscrowContract = await EscrowFactory.connect(owner).deploy(TrustMarketplace.address);
    await EscrowContract.deployed();
    console.log("Escrow contract deployed: ",EscrowContract.address);

    //Deploying DAO contract 
    const TrustDaoFactory = await hre.ethers.getContractFactory("TrustDao");
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

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
