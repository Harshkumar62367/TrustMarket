# TrustMarket

Today, with the help of Filecoin Virtual Machine, it paved a way to build Data markteplces to sell and but data in a secured and safe manner. But what if the data that we are buying is not the data that we wanted.   
And, Since datamarketplace are permissionsless, there are bound to be a ton of fake dataset listed on any datamarketplace. Unlike NFT where projects are validated and unique artists are validated, dataset on the datamarket can come from any source anonymous or popular and this makes it really important to combat fraudulent intent to keep marketplace free from fraudulent dataset.   

Which is where our <b>Trustmarket</b> fits in. Built on Filecoin with the help of FVM, trustmarket provides a standard for resolving any fraudulent dataset with a DAO that governs the validity of a dataset. In our TrustMarke, whhen a buyer claims that a dataset is been falsely represented, DAO takes a vote deciding validity of dataset and resolve through punishments and refunds mechanisms. Trust market ensures that the buyers are protected in permission-less and decentralized manner.


## Deployed Address

```
export const TrustMarketplaceAddress = '0x6c7519B89DD823007AF39947F0d13D577F97e494';
export const TrustNFTAddress = '0x62c81025bD18B8e655BD2A5783944Ea1fF23bf2A';
export const TrustDaoNFTAddress = '0x3d4d72c069D2736Bb486B134Bc07cd25D30951eF';
export const EscrowAddress = '0x31a41b5ce47FFe8e5DAbc16884fF36090cAB62A1';
export const TrustDao = '0x22a9242F237A5698eb76d96a69D6bc14D6819677';
```

## What challenges did we come accross

It was overwhelming for us in first to check out FVM and how we can use this for deploy contracts with verifiable storage. 
We also faced some problem in finalising how our dao backed marketplace will work and what are the steps we can take towards ensuring safe and secure transfer of data. The main problem that we faced was pinning our marketplace data with pinata on ipfs as the docs are overwhelming and not much helpful to us.

Nonetheless, we have a lot of fun building this project.


## Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
