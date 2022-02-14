// pragma solidity >=0.4.16 <0.9.0;

// contract Lottery{
//     address public manager;
//     address[] public players;

//     constructor() public{
//         //main people addressed will be stored in manager (msg.sender is default)
//         manager = msg.sender;
//     }

//     function enter() public payable {
//         //require(msg.value > 0.001 ether)
//         players.push(msg.sender);
//     }


//  function random() public view returns (uint){
//         return uint(keccak256(abi.encodePacked(block.difficulty,now,players)));
//     }


// function pickWinner() public{
//         uint index= random() % players.length;
//         players[index].transfer(address(this).balance);
//         //make lottery start again(play again automatic)
//         players = new address[](0);
//     }
// }


// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.16 <0.9.0;

/** 
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */

contract Lottery{
    address public manager;
    address[] public players;

    constructor() public{
        manager = msg.sender;
    }

    function enter() public payable{
        // require(msg.value > 0.0001 ether);
        players.push(msg.sender);
    }

    function random() public view returns (uint){
        return uint(keccak256(abi.encodePacked(block.difficulty,block.timestamp,players)));
    }

    function pickWinner() public restrictExceptManager{
        uint index= random() % players.length;
        //no payable in remix. players[index].transfer(address(this).balance);
        payable(players[index]).transfer(address(this).balance);
        players = new address[](0);
    }

    modifier restrictExceptManager(){
        require(msg.sender == manager);
        //this(_;) is all others code
        _;
    }

    //manager
    function getPlayers() public view returns (address[] memory){
        return players;
    }
}
