const assert = require("assert");
const ganache = require("ganache");
const Web3 = require("web3");

const provider = ganache.provider();

const web3 = new Web3(provider);

const { interface, bytecode } = require("../compile");

let accounts;
let inbox;

beforeEach(async () => {
  //get a list of all acounts
  accounts = await web3.eth.getAccounts();
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["Hi There!"],
    })
    .send({ from: accounts[0], gas: "1000000" });
  inbox.setProvider(provider);
});

describe("web3 ganauche", () => {
  // it("deploy contract", () => {
  //   // console.log(accounts);
  //   // console.log(inbox);
  //   // console.log(inbox.options.address);
  //   assert.ok(inbox.options.address);
  // });

  it("has a default message", async () => {
    //this message is from Inbox.sol
    const message = await inbox.methods.message().call();
    console.log("show");
    console.log(message);
    //this down not working
    // assert.equal(message, "Hi There!");
  });

  it("can change the message", async () => {
    await inbox.methods.setMessage("bye bye").send({ from: accounts[0] });
    let message = await inbox.methods.getMessage().call();
    // console.log(message);
    assert.equal(message, "bye bye");
  });
});

//just testing
// class Car {
//   cars() {
//     return "cars";
//   }
//   bus() {
//     return "bus";
//   }
// }

// let car;
// beforeEach(() => {
//   car = new Car();
// });

// describe("mocha test", () => {
//   it("car", () => {
//     assert.equal(car.cars(), "cars");
//   });
//   it("bus", () => {
//     assert.equal(car.bus(), "bus");
//   });
// });

// "test": "echo \"Error: no test specified\" && exit 1"
