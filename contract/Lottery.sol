// pragma solidity >=0.4.16 <0.9.0;

// /** 
//  * @title Ballot
//  * @dev Implements voting process along with vote delegation
//  */

// contract Lottery{
//     address public manager;
//     address[] public payable players;

//     constructor() public{
//         manager = msg.sender;
//     }

//     function enter() public payable{
//         require(msg.value > 0.0001 ether);
//         players.push(msg.sender);
//     }

//     function random() public view returns (uint){
//         return uint(keccak256(abi.encodePacked(block.difficulty,block.timestamp,players)));
//     }

//     function pickWinner() public restrictExceptManager{
//         uint index= random() % players.length;
//         //no payable in remix. players[index].transfer(address(this).balance);
//         // payable(players[index]).transfer(address(this).balance);
//         players[index].transfer(address(this).balance);
//         players = new address[](0);
//     }

//     modifier restrictExceptManager(){
//         require(msg.sender == manager);
//         //this(_;) is all others code
//         _;
//     }

//     //manager
//     function getPlayers() public view returns (address[] memory){
//         return players;
//     }
// }


// SPDX-License-Identifier: GPL-3.0

// pragma solidity ^0.4.17;
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
        require(msg.value > 0.0001 ether);
        players.push(msg.sender);
    }

    function random() public view returns (uint){
        return uint(keccak256(abi.encodePacked(block.difficulty,block.timestamp,players)));
    }

    function pickWinner() public restrictManagerExcept{
        //for only manager to be deploying
        // require(msg.sender == manager);
        uint index= random() % players.length;
        // payable(players[index]).transfer(address(this).balance);
        //dont care about this error now 
        players[index].transfer(address(this).balance);
        players = new address[](0);
    }

    modifier restrictManagerExcept(){
        require(msg.sender==manager);
        _;
    }

    //get players
    function getPlayers() public view returns (address[] memory){
        return players;
    }
}
