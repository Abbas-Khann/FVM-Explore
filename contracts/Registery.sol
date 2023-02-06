//SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Registery is Ownable {
    address public manager;

    mapping(address => string) public contractRecord;

    modifier onlyManager() {
        require(msg.sender == manager, "Only Manager Authorised");
        _;
    }

    constructor(address _manager) {
        manager = _manager;
    }

    function setManager(address _newManager) public onlyOwner {
        manager = _newManager;
    }

    /// add New contract record
    function addContractRecord(address _contractAddress, string memory _ipfsURI)
        public
        onlyManager
    {
        require(_contractAddress != address(0), "Not a Valid contract Address");

        contractRecord[_contractAddress] = _ipfsURI;
    }

    /// get Contract record
    function getContractRecord(address _contractAddress)
        public
        view
        returns (string memory _ipfsURI)
    {
        _ipfsURI = contractRecord[_contractAddress];
    }
}
