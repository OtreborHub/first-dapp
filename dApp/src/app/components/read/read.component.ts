import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Resource } from 'src/app/models/resource.model';
import { ContractService } from 'src/app/services/contract.service';
import { ResourceService } from '../../services/resource.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {


  nameSearch: string = "";
  idSearch!: number;
  alertMessage?: string;

  constructor(private contractsrv: ContractService, private resourcesrv: ResourceService, private router:Router) {}

  ngOnInit(): void {
    this.resourcesrv.getResources();
  }

  recupera() {
    let canSearch = false;
    if(this.nameSearch != ""){
      canSearch = true;
      this.contractsrv.recuperaByName(this.nameSearch)
      .then(result => {
          console.log("Resource found: { id: " + result.id + ", name: " + result.name + ", content: " + result.content + " }");
          let resource: Resource = new Resource(result.name, result.content);
          resource.setId(result.id);
          this.resourcesrv.setResources([result]);
          this.router.navigate(['/list']);
        })
        .catch(error => {
          console.log("Risorsa non recuperata: errore" + error)
        })
    }

    if(this.idSearch != undefined) {
      canSearch = true;
      this.contractsrv.recuperaById(this.idSearch)
        .then(result => {
          console.log("Resource found: { id: " + result.id + ", name: " + result.name + ", content: " + result.content + " }");
          let resource: Resource = new Resource(result.name, result.content);
          resource.setId(result.id);
          this.resourcesrv.setResources([result]);
          this.router.navigate(['/list']);
        })
        .catch(error => {
          console.log("Risorsa non recuperata: " + error);
        })
    }

    if(!canSearch){
      this.contractsrv.recupera()
      .then(
        result => {
          let searchedResources: Resource[] = [];
          result.forEach((element: Resource) => {
            searchedResources.push(element);
            console.log("Resource found: { id: " + element.id + ", name: " + element.name + ", content: " + element.content + " }");
          });
          this.resourcesrv.setResources(searchedResources);
          this.router.navigate(['/list']);
        })
      .catch(
        error => console .log(error)
      )
    }

    // if(this.resourcesrv.getResources().length == 0){
    //   this.alertMessage = "no result found";
    // }else{
    //   this.router.navigate(['/list']);
    // }
  }



}
