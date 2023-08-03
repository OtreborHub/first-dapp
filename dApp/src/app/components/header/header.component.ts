import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { ContractService } from 'src/app/services/contract.service';
import { Constants } from 'src/app/utils/constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private accountSrv : AccountService, private cs : ContractService, private router : Router){}
  
  currentPage!: string;
  logFirstError:string = "E' necessario connettersi con il proprio wallet, per poter utilizzare questa funzione"

  ngOnInit(): void {

    //Cercare nel router chi tiene in memoria l'ultima pagina visitata: utile per fare funzione di back()
    this.currentPage = "";
  }
  
  
  trasferisci(){
    if(this.accountSrv.checkUndefinedAccount(false)){
      Swal.fire("Attenzione!", Constants.LOGMISSING_ERROR, "warning");
    }else{
      this.router.navigate([Constants.TRANSFER_PATH]);
    }
  }

  mint(){
    if(this.accountSrv.checkUndefinedAccount(false)){
      Swal.fire("Attenzione!", Constants.LOGMISSING_ERROR, "warning");
    }else{
      this.router.navigate([Constants.MINT_PATH]);
      
    } 
  }

  nft(){
    if(this.accountSrv.checkUndefinedAccount(false)){
      Swal.fire("Attenzione!", Constants.LOGMISSING_ERROR, "warning");
    }else{
      this.router.navigate([Constants.NFT_PATH]);
    } 
  }
  
  goHome(){
    this.router.navigate([Constants.HOME_PATH]);
  }


  
  // signed: boolean = false;
  // info(){
  //   Swal.fire("Informazione:", "Per sloggare è necessario disconnettere l'account Metamsk dall'estensione del browser\n e ricaricare la pagina", "info");
  // }



}
