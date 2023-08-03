  //SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.9.0;

library UtilLib {
  
  function memcmp(bytes memory a, bytes memory b)
        public
        pure
        returns (bool)
    {
        return (a.length == b.length) && (keccak256(a) == keccak256(b));
    }

    function strcmp(string memory a, string memory b)
        public
        pure
        returns (bool)
    {
        return memcmp(bytes(a), bytes(b));
    }

    //se del codice è stato trovato all'indirizzo account(input) return true
    //se EOA return false;
    function isContract(address account) public view returns(bool) {
        uint size;
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }

}