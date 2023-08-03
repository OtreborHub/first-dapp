import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { AccountService } from 'src/app/services/account.service';
import { ContractService } from 'src/app/services/contract.service';
import { ResourceService } from 'src/app/services/resource.service';
import { Constants } from 'src/app/utils/constants';

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.css']
})
export class NFTComponent implements OnInit {

  constructor(public accountSrv: AccountService, public resourceSrv: ResourceService, public contractSrv: ContractService) { }

  nomeCard: string = "";
  contentCard: string = "";
  address!: string;
  balance!: number;
  type: string = "Cards"
  _eastern!: number;

  tokenIds: number[] = [];
  seeDetailOf: number = -1;

  ngOnInit() {
    this.nomeCard = "";
    this.contentCard = "";
    this.accountSrv.checkUndefinedAccount(true);
    this.contractSrv.getNFTContract();
    this.address = this.accountSrv.getAccount();

    if (this.balance == undefined) {
      this.getBalance();
      this.tokenIds = this.resourceSrv.tokenIds;
    }

  }

  crea() {
    let newCard = new Card(this.nomeCard, this.contentCard);
    let cardData = JSON.stringify(newCard);
    this.contractSrv.createNFT(this.address, cardData).then(
      result => console.log(result),
      err => console.log(err),
    )
  }

  getBalance() {
    this.contractSrv.NFTBalance(this.address).then(
      result => {
        console.log(result);
        this.balance = result;
      }
    ).catch(
      error => {
        console.log(error)
      }
    )

  }

  get eastern(): number {
    let mock = this.nomeCard + this.contentCard == Constants.MOCK_NFT;
    if (mock && this.seeDetailOf == -1) {
      this._eastern = 0;
    } else if (mock && this.seeDetailOf > -1) {
      this._eastern = 1;
    } else {
      this._eastern = 2;
    }

    return this._eastern;

  }


  detail(tokenId: number) {
    this.seeDetailOf = tokenId;
  }

  back() {
    this.seeDetailOf = -1;
  }


}
