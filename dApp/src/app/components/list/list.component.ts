import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Resource } from 'src/app/models/resource.model';
import { AccountService } from '../../services/account.service';
import { ResourceService } from '../../services/resource.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  
  resources: Resource[] = [];
  eventResult!: string;
  
  constructor(private accountSrv: AccountService,
              private resourceSrv: ResourceService, 
              private router: Router) { }
  
  ngOnInit(): void {
      this.accountSrv.checkUndefinedAccount(true);
      this.resources = this.resourceSrv.getResources();
  }

  back(){
    this.accountSrv.checkUndefinedAccount(true);
    this.router.navigate(['/home']);
  }




}
