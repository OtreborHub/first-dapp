import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ContractService } from 'src/app/services/contract.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private contractSrv: ContractService, private router: Router) { }
  accountsFile: Map<string, string> = new Map();

  checkUndefinedAccount(navigate:boolean): boolean{
    let undefinedAccount = this.contractSrv.getAccounts() == undefined ? true:false;
    
    if(undefinedAccount && navigate){
      this.router.navigate(['']);
    }  
    
    return undefinedAccount;
  }

  getAccount(){
    let account = this.contractSrv.getAccounts();
    return account[0];
  }
  

  registerAccount(){
    let account = this.contractSrv.getAccounts();
    this.accountsFile.set(account[0], "Ganache Account");
    console.log(this.accountsFile);
    return this.accountsFile.get(account[0]);
  }

}
