const assert = require("assert");
const Web3 = require("web3");
const ganauche = require("ganache-provider");

const web3 = Web3(ganauche.provider());

const { interface, bytecode } = require("../compile");

let accounts;
let lottery;

beforeEach("first", () => {
  it("initialize", async () => {
    accounts = await web3.eth.getAccounts();
    lottery = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ data: bytecode })
      .send({ from: accounts[0], gas: "1000000" });
  });
});

describe("describe lottery contract", () => {
  it("deploy a contract", () => {
    assert.ok(lottery.options.address);
  });
});
