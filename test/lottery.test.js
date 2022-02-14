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
    //first player enter (this is us)
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("0.02", "ether"),
    });

    //second player enter with different account
    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei("0.014", "ether"),
    });

    //third player enter
    await lottery.methods.enter().send({
      from: accounts[2],
      value: web3.utils.toWei("0.017", "ether"),
    });

    const players = await lottery.methods
      .getPlayers()
      .call({ from: accounts[0] });

    assert.equal(accounts[0], players[0]);
    assert.equal(accounts[1], players[1]);
    assert.equal(accounts[2], players[1]);

    assert.equal(3, players.length);
  });
});
