pragma solidity >=0.4.16 <0.9.0;
//installed (npm install solc@0.4.25)

// contract Inbox{
//     string public message;

//     function Inbox(string initialMessage) {
//         message = initialMessage;
//     }

//     function setMessage(string newMessage){
//         message = newMessage;
//     }
// }


contract Inbox{
    string public message;

    // constructor(string memory initialMessage) public{
    //     message = initialMessage;
    // }

    function setMessage(string memory newMessage) public{
        message = newMessage;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }
}


// contract MyContract {
//     string value;

//     function get() public view returns (string memory) {
//         return value;
//     }

//     function set(string memory _value) public {
//         value = _value;
//     }

//     constructor() public {
//         value = "myValue";
//     }
// }

// SPDX-License-Identifier: GPL-3.0
// pragma solidity >=0.4.16 <0.9.0;

// contract SimpleStorage {
//     uint storedData;

//     function set(uint x) public {
//         storedData = x;
//     }

//     function get() public view returns (uint) {
//         return storedData;
//     }
// }