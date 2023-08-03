//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;
import "./UtilLib.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract TestContract is Ownable {
    event createResource(uint id, string name, string content);

    // struct User {
    //     address payable addr;
    //     Resource[] resources;
    // }

    //mapping(address  => uint) balances;

    struct Resource {
        uint id;
        string name;
        string content;
    }

    //mapping(address => uint[]) internal resources;
    Resource[] internal res;

    function newResource(string memory _name, string memory _content) external {
        uint id;
        
        if(res.length > 0){
            id = res.length;
        }else{
            id = 0;
        }

        res.push(Resource(id, _name, _content));
        //resources[msg.sender].push(id);
        emit createResource(id, _name, _content);
    }


    function getResources() view external returns (Resource[] memory) {
        Resource[] memory getresource = res;
        return getresource;
    }

    function searchByName(string memory name) external view returns (Resource memory) {
        for(uint i = 0; i < res.length; i++){
            if(UtilLib.strcmp(name, res[i].name)){
                Resource memory resource = Resource(res[i].id, res[i].name, res[i].content);
                return (resource);
            }
        }
        return (Resource(404, "No Resource Found", ""));
    }

    function searchById(uint id) external view returns (Resource memory myResource) {
        for(uint i = 0; i < res.length; i++){
            if(id == res[i].id){
                Resource memory resource = Resource(res[i].id, res[i].name, res[i].content);
                return (resource);
            }
        }
        return (Resource(404, "No Resource Found", ""));
    }

    function transfer(address _to)  payable external {
        (bool success, ) = _to.call{value:msg.value}("");
        require(success, "Transaction Failed!");
    }

    function deposit() payable public {}

    function addressBalance(address addr) external view returns(uint){
        return addr.balance;
    }

    //Restituisce il saldo del contratto
    function contractBalance() external view returns(uint){
        return address(this).balance;
    } 


}
