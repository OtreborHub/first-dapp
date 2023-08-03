import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { ContractService } from '../../../services/contract.service';

@Component({
  selector: 'nft-card',
  templateUrl: './nft-card.component.html',
  styleUrls: ['./nft-card.component.css']
})
export class NFTCardComponent implements OnInit {

  @Input() tokenId!: number;
  name!: string;
  content!:string;
  url!:string;
  account!: string;
  constructor(public accountSrv: AccountService, public contractSrv: ContractService, public router: Router) { }

  ngOnInit(): void {
    this.accountSrv.checkUndefinedAccount(true);
    this.account = this.accountSrv.getAccount();
    this.contractSrv.getNFTMetadata(this.tokenId).then(
      result => {
        let meta = result.split('\'');
        console.log("Card found: { id: " + this.tokenId + ", name: " + meta[3] + ", content: " + meta[7] + "}");
        this.name = meta[3];
        this.content = meta[7];
        this.url = meta[11].split('\"');
      }
    )
  }

}
