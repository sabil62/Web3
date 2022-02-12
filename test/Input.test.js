const assert = require("assert");
const ganache = require("ganache");
const Web3 = require("web3");

const web3 = new Web3(ganache.provider());

const { interface, bytecode } = require("../compile");

let accounts;
let inbox;

beforeEach(async () => {
  //get a list of all acounts
  accounts = await web3.eth.getAccounts();
  inbox = new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["Hi There!"],
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("web3 ganauche", () => {
  it("deploy contract", () => {
    // console.log(accounts);
    console.log(inbox);
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
