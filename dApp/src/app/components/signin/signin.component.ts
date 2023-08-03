import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContractService } from 'src/app/services/contract.service';
import Swal from 'sweetalert2';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {


  ngOnInit(): void {
  }


  signed: boolean = false;

  constructor(private accountSrv : AccountService, private cs : ContractService, private router : Router){

  }

  linkProvider(){
    this.cs.connectAccount();
    this.cs.accStatusSubject.subscribe(
      result => {
        console.log(result);
        let name = this.accountSrv.registerAccount();  
        this.signed = true;
        Swal.fire("Successo!","Bentornato " + name, 'success');
        this.navigate();
      },
      err => console.log(err),
    );
  }

  private navigate(){
    this.router.navigate(['/home']);
  }


}
