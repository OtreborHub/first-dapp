import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContractService } from 'src/app/services/contract.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  blockNumber?: string;
  blockNumberPresent: boolean = false;
  viewPage = false;


  nameSearch: string = "";
  idSearch!: number;

  constructor(private rs: RestService, private cs: ContractService, private router: Router) { }

  ngOnInit(): void {
    if (this.cs.getAccounts() == undefined) {
      this.router.navigate(['']);
    }
  }

  getBlockNumber() {
    this.rs.getBlockNumber().subscribe(
      value => {
        console.log(value.result);
        this.blockNumber = value.result;
        this.blockNumberPresent = true;
      },
      err => console.log(err),
    )
  }

}
