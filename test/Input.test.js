const assert = require("assert");
const ganache = require("ganache");
// const Web3 = require("web3");

// const web3 = Web3(ganache.provider());

//just testing
class Car {
  cars() {
    return "cars";
  }
  bus() {
    return "bus";
  }
}

describe("mocha test", () => {
  it("car", () => {
    let car = new Car();
    assert.equal(car.cars(), "cars");
  });
});

// "test": "echo \"Error: no test specified\" && exit 1"
