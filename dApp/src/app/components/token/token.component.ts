import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AccountService } from '../../services/account.service';
import { ContractService } from '../../services/contract.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {

  constructor(private accountSrv: AccountService, private contractSrv: ContractService) { }

  // 0.00000000000001 cifra minore mintabile
  
  amountMint!: number;
  amountTransfer!: number;
  toTransfer: string = "0x5122F7f2caF697fAAd52b7f183FB8B9b13A3061f";
  mintedToken!: number;

  address!: string;
  balance!: number;
  type: string = "TSTK";

  tokenName!: string;
  tokenSymbol!: string;

  async ngOnInit(){
    this.accountSrv.checkUndefinedAccount(true);
    this.contractSrv.getTokenContract();
    
    let account = this.accountSrv.getAccount();
    this.address = account;
    
    this.getTotalSupply();
    this.getBalance();
    this.tokenProperty();

  }

  mint() {
    if (this.amountMint == undefined || this.amountMint <= 0) {
      Swal.fire("Attenzione!", "Inserire un valore valido per la quantità di ether da mintare", 'warning');
    }
    this.contractSrv.mint(this.amountMint).then(
      result => {
        console.log("Minting completato - gas utilizzato: " + result.gasUsed);
        this.getTotalSupply();
        this.getBalance();
      }).catch(
        err => console.log(err)
      )
  }

  transfer() {
    if (this.amountTransfer == undefined || this.amountTransfer <= 0) {
      Swal.fire("Attenzione!", "Inserire un valore valido per la quantità di ether da trasferire", 'warning');
    }

    if (this.toTransfer == undefined || this.toTransfer == "") {
      Swal.fire("Attenzione!", "Inserire un valore valido per l'indirizzo destinatario del trasferimento", 'warning');
    }
    this.contractSrv.transferToken(this.amountTransfer, this.toTransfer).then(
      result => {
        console.log("Transferimento complentato - gas utilizzato: " + result.gasUsed)
      }).catch(
        err => console.log(err)
      )
  }

  getTotalSupply() {
    this.contractSrv.totalSupply().then(
      result => {
        console.log(result);
        let exp = 10**18;
        this.mintedToken = result/exp;
      }
    ).catch(
      error => console.log(error)
    )
  }

  getBalance() {
   this.contractSrv.tokenBalance(this.address).then(
      result => {
        console.log(result);
        let exp = 10**18
        this.balance = result/exp;
      }
    ).catch(
      error => {
        console.log(error)
      }
    )

  }

  tokenProperty(){
    this.contractSrv.tokenProperty().then(
      result => {
        console.log(result);
        this.tokenName = result[0];
        this.tokenSymbol = result[1];
      }
    ).catch(
      error => console.log(error)
    )
  }

  clean() {
    this.toTransfer = "";
  }
}
