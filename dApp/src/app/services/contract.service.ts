import { Injectable } from '@angular/core';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import Web3 from "web3";
import Web3Modal from "web3modal";
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private web3js: any;
  private provider: any;
  private accounts: any;
  private testContract: any;
  private tokenContract: any;
  private NFTContract: any;
  web3Modal

  private accountStatusSource = new Subject<any>();
  accStatusSubject = new Subject<any>();
  accountStatus$ = this.accountStatusSource.asObservable();

  constructor() {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: "044895efc15547e1a27042c1d2874de0" // required
        }
      }
    };

    this.web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions, // required
      theme: "dark"
      //   theme: {
      //     background: "rgb(39, 49, 56)",
      //     main: "rgb(199, 199, 199)",
      //     secondary: "rgb(136, 136, 136)",
      //     border: "rgba(195, 195, 195, 0.14)",
      //     hover: "rgb(16, 26, 32)"
      //   }
    });

  }

  async connectAccount() {
    this.web3Modal.clearCachedProvider();
    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts();
    this.accountStatusSource.next(this.accounts);
    this.accStatusSubject.next(this.accounts);
  }

  getAccounts() {
    return this.accounts;
  }

  // -------------------------------------------------- CONTRACT SINGLETONS ------------------------------------------------

  async getTestContract() {
    if (this.testContract != undefined) {
      return this.testContract;
    } else {
      this.testContract = await new this.web3js.eth.Contract(environment.testcontract_abi, environment.testcontract_address);
      this.addContractListener();
      return this.testContract;
    }
  }

  async getTokenContract() {
    if (this.tokenContract != undefined) {
      return this.tokenContract;
    } else {
      this.tokenContract = await new this.web3js.eth.Contract(environment.tokencontract_abi, environment.tokencontract_address);
      this.addTokenListener();
      return this.tokenContract;
    }
  }

  async getNFTContract() {
    if (this.NFTContract != undefined) {
      return this.NFTContract;
    } else {
      this.NFTContract = await new this.web3js.eth.Contract(environment.nftcontract_abi, environment.nftcontract_address);
      this.addNFTListener();
      return this.NFTContract;
    }
  }

  // -------------------------------------------------- LISTENERS ------------------------------------------------

  async addContractListener() {
    this.testContract.events.createResource({}, (error: { message: string; }, data: { returnValues: any; }) => {
      if (error) {
        console.log("Error NewResource: " + error);
      } else {
        let id = data.returnValues.id;
        let name = data.returnValues.name;
        let content = data.returnValues.content;
        Swal.fire('Risorsa creata', name, 'info');
        console.log("New Resource Event: { id: " + id + ", name: " + name + ", content: " + content + " }");
      }
    });
    console.log("createResource Event: Contract Listener agganciato");
  }


  async addTokenListener() {
    this.tokenContract.events.Transfer({}, (error: { message: string; }, data: { returnValues: any; }) => {
      if (error) {
        console.log("Error NewResource: " + error);
      } else {
        let from = data.returnValues.from;
        let to = data.returnValues.to;
        let value = data.returnValues.value;
        console.log("Transfer Event : { from: " + from + ", to: " + to + ", value: " + value + " }");
      }
    });
    console.log("Transfer Event: Token Listener agganciato");
  }

  async addNFTListener() {
    this.NFTContract.events.Transfer({}, (error: { message: string; }, data: { returnValues: any; }) => {
      if (error) {
        console.log("Error NewResource: " + error);
      } else {
        let from = data.returnValues.from;
        let to = data.returnValues.to;
        let value = data.returnValues.tokenId;
        console.log("Transfer Event : { from: " + from + ", to: " + to + ", with tokenID: " + value + " }");
      }
    });
    console.log("Transfer Event: NFT Listener agganciato");
  }


  // -------------------------------------------------- TEST CONTRACT ------------------------------------------------

  async crea(name: string, content: string) {
    const create = await this.testContract.methods.newResource(name, content).send({ from: this.accounts[0] });
    return create;
  }

  async recuperaByName(name: string) {
    const search = await this.testContract.methods.searchByName(name).call();
    return search;
  }

  async recuperaById(id: number) {
    const search = await this.testContract.methods.searchById(id).call();
    return search;
  }

  async recupera() {
    await this.getTestContract();
    const search = await this.testContract.methods.getResources().call();
    return search;
  }

  async transferEther(_amount: number, _to: string) {
    let ether = _amount * 10**18; 
    //ad 1 Ether corrispondono ad 1.000.000.000.000.000.000 di wei
    const success = await this.testContract.methods.transfer(_to).send({ from: this.accounts[0], value: ether });
    return success;
  }

  async saldo() {
    const balance = await this.testContract.methods.contractBalance().call();
    return balance;
  }

  async deposita(_amount: number) {
    let ether = _amount * 10**18;
    const deposita = await this.testContract.methods.deposit().send({ from: this.accounts[0], value: ether });
    return deposita;
  }

  async balanceEth(address:string){
    const eth = await this.testContract.methods.addressBalance(address).call();
    return eth;
  }

  // ---------------------------------------------- TOKEN CONTRACT --------------------------------------------------

  async mint(_amount: number) {
    //usare Math.pow(10, 18) se browser da problemi
    let ether = _amount * 10**18;
    const mint = await this.tokenContract.methods.mintMinerReward().send({ from: this.accounts[0], value: ether });
    return mint;
  }
  
  async transferToken(_amount: number, _to: string){
    //usare Math.pow(10, 18) se browser da problemi
    let ether = _amount * 10**18;
    const transfer = await this.tokenContract.methods.transfer(_to).send({ from: this.accounts[0], value: ether });
    return transfer;

  }

  async totalSupply(){
    await this.getTokenContract()
    let supply = await this.tokenContract.methods.totalSupply().call();
    return supply;
  }

  async tokenProperty(){
    await this.getTokenContract();
    const props = await this.tokenContract.methods.props().call();
    return props;
  }

  async tokenBalance(address: string){
    await this.getTokenContract();
    const balanceOf = await this.tokenContract.methods.balanceOf(address).call();
    return balanceOf;
  }

  // ------------------------------------------------------------------------------------------------------------

  // ---------------------------------------------- NFT CONTRACT --------------------------------------------------

  async createNFT(address: string, cardStructure: string){
    let supply = await this.NFTContract.methods.awardItem(address, cardStructure).send({ from: this.accounts[0]});
    return supply;
  }

  async NFTBalance(address: string){
    await this.getNFTContract();
    const balanceOf = await this.NFTContract.methods.balanceOf(address).call();
    return balanceOf;
  }
  
  async getNFTOwner(tokenID: number){
    await this.getNFTContract();
    const owner = await this.NFTContract.methods.ownerOf(tokenID).call();
    return owner;
  }

  async getNFTMetadata(tokenID: number){
    await this.getNFTContract();
    const metadata = await this.NFTContract.methods._exampleTokenURI(tokenID).call();
    return metadata;
  }

  async transferNFT(to: string, tokenId: number){
    const transfer = await this.NFTContract.methods.transferItem(this.accounts[0], to, tokenId).send({ from: this.accounts[0]});
    return transfer;
  }
  // -------------------------------------------------- ACCOUNTS ------------------------------------------------
  // Aggiungere una nuova storage accounts nel contratto come mappa address --> string. 
  // String da cui recuperare il nome dell'account; Per ora gestiamo la cosa in account.service.ts
}