const assert = require("assert");
const Web3 = require("web3");
const ganauche = require("ganache");

const web3 = new Web3(ganauche.provider());

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
    assert.equal(accounts[2], players[2]);

    assert.equal(3, players.length);
  });

  //makes sure there is error
  it("requires a minimum amount of error", async () => {
    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: 0, //nothing or 0 wei value (this should be atleast 0.1 ether to work )
      });
      //if the upper statement doesnot give error this will say it is false
      //or if up line doesnot give error then the test fails
      //if we comment this then also it will work provided that the upper one is error
      //else we need this
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  //check or test pickwinner function
  it("some other than mangaer accesses pickwinner", async () => {
    try {
      await lottery.methods.pickWinner().call({
        from: accounts[1], //our manager has accounts[0] (so this is not our manager and hence should give error)
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });
});
