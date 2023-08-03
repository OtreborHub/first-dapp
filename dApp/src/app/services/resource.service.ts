import { Injectable } from '@angular/core';
import { Resource } from '../models/resource.model';
import { AccountService } from './account.service';
import { ContractService } from './contract.service';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  account!: string;
  constructor(private contractSrv: ContractService, private accountSrv: AccountService) { }

  private resources!: Resource[];

  setResources(resources: Resource[]) {
    this.resources = resources;
  }

  getResources() {
    
    if (!this.resources) {
      this.contractSrv.recupera().then(
        result => {
          if (result.length == 0) {
            console.log("retrieving resources results empty");
          } else {
            let searchedResources: Resource[] = [];
            result.forEach((element: Resource) => {
              searchedResources.push(element);
              //Logging initial Resources in Contract
              console.log("Resource found: { id: " + element.id + ", name: " + element.name + ", content: " + element.content + " }");
            });
            this.resources = searchedResources;
          }
        })
    }
    return this.resources;
  }

  addResource(resource: Resource) {
    this.resources.push(resource);
  }

  //-------------------------------------------------------------------------- CARDS ------------------------------------------------------------ 

  private _tokenIds: number[] = [0, 1, 2, 3];

  fillExampleCards() {
    this.account = this.accountSrv.getAccount();
    // let ownedTokenId = this.callNFTOwner();
  }

  get tokenIds(){
    return this._tokenIds;
  }

  addTokenIds(tokenId: number) {
    this._tokenIds.push(tokenId);
  }

  callNFTOwner() {
    let result: number[] = []
    for (let i = 1; i < 10; i++) {
      let lastTokenId = 0;
      this.contractSrv.getNFTOwner(i).then(
        result => {
          console.log("NFT OWNER Result: " + result);
          if (result == this.account) {
            result.push(i);
            lastTokenId = i
          }
        }).catch(
          error => {
            console.log(this.tokenIds.length + " NFT Found for account " + this.account);
          }
        )

    }

    return result;
  }

  async callNFTMetadata(tokenId: number): Promise<any>{
    await this.contractSrv.getNFTMetadata(tokenId);
  }

  
    
}
