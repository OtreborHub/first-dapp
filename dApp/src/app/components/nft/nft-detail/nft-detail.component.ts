import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { ContractService } from '../../../services/contract.service';

@Component({
  selector: 'app-nft-detail',
  templateUrl: './nft-detail.component.html',
  styleUrls: ['./nft-detail.component.css']
})
export class NFTDetailComponent implements OnInit {

  transferTo: string = '0x5122F7f2caF697fAAd52b7f183FB8B9b13A3061f';
  @Input() tokenId!: number;
  name!: string;
  content!: string;
  url!: string;
  account!: string;

  constructor(public accountSrv: AccountService, public contractSrv: ContractService, public router: Router, private route: ActivatedRoute) {
  }


  ngOnInit() {
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



  clean() {
    this.transferTo = "";
  }

  back() {
    this.accountSrv.checkUndefinedAccount(true);
    this.router.navigate(['/nft']);
  }

  transfer() {
    this.contractSrv.transferNFT(this.transferTo, this.tokenId).then(
      result => console.log(result)
    ).catch(
      error => console.log(error)
    );
  }

}
