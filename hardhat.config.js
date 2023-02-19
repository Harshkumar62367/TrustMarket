require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: 'filecoinHyperspace',
  networks:{
    filecoinHyperspace:{
      url: 'https://api.hyperspace.node.glif.io/rpc/v1',
      chainId: 3141,
      accounts: [process.env.PRIVATE_KEY ?? 'undefined'],
    }
  }
};
