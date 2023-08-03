import { Component, OnInit } from '@angular/core';
import { ContractService } from '../../services/contract.service';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { env } from 'process';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  public address!: any;
  public balance!: number;
  public type: string = "ETH"

  public transferTo = '0x5122F7f2caF697fAAd52b7f183FB8B9b13A3061f' //2° Ganache account
  public amount = 0;
  public remarks = '';
  public disabled = false;

  constructor(private contractSrv: ContractService, private accountSrv: AccountService, private router: Router) {
  }

  ngOnInit(): void {
    this.accountSrv.checkUndefinedAccount(true);
    let account = this.accountSrv.getAccount();
    this.address = account;

    this.contractSrv.balanceEth(account).then(
      result => {
        console.log(result);
        let exp = 10**18;
        this.balance = result/exp;
      }
    ).catch(
      err => console.log(err)
    )
  }

  transferEther(e: Event) {
    this.contractSrv.transferEther(this.amount, this.transferTo).then(
      result => console.log(result)
    ).catch(
      error => console.log(error)
    )

    this.contractSrv.saldo().then(
      result => console.log(result)
    ).catch(
      error => console.log(error)
    )
  }

  deposit() {
    this.transferTo = environment.testcontract_address;
    this.disabled = true;
    this.contractSrv.deposita(this.amount).then(
      result => {
        console.log(result);
        this.disabled = false;
      })
      .catch(
      error => {
        console.log(error);
        this.disabled = false;
      })

  }

  back() {
    this.accountSrv.checkUndefinedAccount(true);
    this.router.navigate(['/home']);
  }

}
