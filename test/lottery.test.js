const assert = require("assert");
const Web3 = require("web3");
const ganauche = require("ganache-provider");

const web3 = Web3(ganauche.provider());

const { interface, bytecode } = require("../compile");

let accounts;
let lottery;

beforeEach("first", async () => {
  accounts = await web3.eth.getAccounts();
  lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("describe lottery contract", () => {
  //contract working or not
  it("deploy a contract", () => {
    assert.ok(lottery.options.address);
  });

  //enter() method(function) of lottery.sol(deployed contract)
  it("enter function(using just one account(ether account))", async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("0.02", "ether"),
    });

    const players = await lottery.methods
      .getPlayers()
      .call({ from: accounts[0] });
  });

  assert.equal(accounts[0], players[0]);
  assert.equal(1, players.length);
});
