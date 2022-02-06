const path = require("path");
const fs = require("fs");
const solc = require("solc");

//to specify a path that is universal (works in all OS)
const inboxPath = path(__dirname, "contract", "Inbox.sol");
const source = fs.readFileSync(inboxPath, "utf-8");

console.log(solc.compile(source, 1));
