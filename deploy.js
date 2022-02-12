// const hdWalletProvider = const HDWalletProvider = require("@truffle/hdwallet-provider");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const mnemonicPhrase =
  "develop dream kit settle pool false length snap ketchup web arrive machine";

const provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonicPhrase,
  },
  providerOrUrl:
    "https://rinkeby.infura.io/v3/2aa898d3dbb04587a4542c8f7cace42d",
});
