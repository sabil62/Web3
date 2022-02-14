const path = require("path");
const fs = require("fs");
const solc = require("solc");

//to specify a path that is universal (works in all OS)
const inboxPath = path.resolve(__dirname, "contract", "Inbox.sol"); //__dirname is root directoryno
const source = fs.readFileSync(inboxPath, "utf-8");

// console.log(solc.compile(source, 1));

//to export  this in other files
module.exports = solc.compile(source, 1).contracts[":Inbox"];
