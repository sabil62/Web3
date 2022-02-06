const assert = require("assert");
const ganache = require("ganache");
const Web3 = require("web3");

const web3 = new Web3(ganache.provider());

beforeEach(() => {
  //get a list of all acounts
  web3.eth.getAccounts().then((fetchedAccounts) => {
    console.log(fetchedAccounts);
  });
});

describe("web3 ganauche", () => {
  it("deploy contract", () => {});
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
