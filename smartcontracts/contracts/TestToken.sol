//SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestToken is ERC20{

    //Fixed Supply Token: Esisteranno 5000000000000000000 copie (del valore di 5 ETH)
    //del mio Token ERC20 allocati sull'account che deploya il contratto
    // constructor() ERC20("Fixed", "FIX") {
    //     _mint(msg.sender, 5000000000000000000);
    // }

    //ATTENZIONE: I Mapping vengono effettivamente riempiti la Ganache UI non permette la visualizzazione del contenuto.
    // mapping(address => uint) public tokenBalances;

    //Metodo 1
    constructor() ERC20("TestToken", "TSTK") {
        // Minta 5ETH in TSTK dandoli all'owner del contratto
        _mint(msg.sender, 5000000000000000000);
    }

    //Forniamo x copie del nostro Token all'indirizzo del miner che chiamerà questa funzione
    //Funzione utililzzata per premiare il miner.
    function mintMinerReward() external payable returns(uint, uint) {
        require(msg.value > 0, "You need to send some ether");
        require(msg.sender.balance > msg.value, "Insufficent funds for the transaction requested");

        //Errore a runtime: https://ethereum.stackexchange.com/questions/110374/minting-throws-erc20-mint-to-the-zero-address 
        // Testando sulla rete di Ganache non c'è realmente nessun miner per cui block.coinbase risulta 0.
        // in produzione andrà usato block.coinbase invece di msg.sender.
        // _mint(block.coinbase, msg.value);

        _mint(msg.sender, msg.value);
        return (balanceOf(msg.sender), totalSupply());
    }

    // Metodo 2 - con TestToken is MinerRewardMinter
    // constructor() MinerRewardMinter("MyToken", "MYTK"){
    // }

    // function _beforeTokenTransfer(address from, address to, uint value) internal virtual override {
    //     if (!(from == address(0) && to == block.coinbase)) {
    //       _mintMinerReward();
    //     }
    //     super._beforeTokenTransfer(from, to, value);
    // }


    function transfer(address to) external payable returns(uint){
        
        transfer(to, msg.value);
        return balanceOf(to);
    }

    function props() public view returns(string memory, string memory){
        string memory name = name();
        string memory symbol = symbol();
        return (name, symbol);
    }

}