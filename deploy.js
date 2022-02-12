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

const web3 = new Web3(provider);

//ABI(interface) and bytecode
const { interface, bytecode } = require("./compile");

let accounts;
//connect to network or main code starts here
const deploy = async () => {
  accounts = await web3.eth.getAccounts();
  //   console.log(accounts);
  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["random"] })
    .send({ from: accounts[0], gas: "1000000" });

  console.log("Contract Deployed to ", result.options.address);
};

deploy();
