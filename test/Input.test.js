const assert = require("assert");
const ganache = require("ganache");
const Web3 = require("web3");

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

let car;
beforeEach(() => {
  car = new Car();
});

describe("mocha test", () => {
  it("car", () => {
    assert.equal(car.cars(), "cars");
  });
  it("bus", () => {
    assert.equal(car.bus(), "bus");
  });
});

// "test": "echo \"Error: no test specified\" && exit 1"
