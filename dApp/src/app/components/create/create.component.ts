import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ContractService } from '../../services/contract.service';
import { ResourceService } from '../../services/resource.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private contractSrv: ContractService, private resourceSrv: ResourceService) { }

  ngOnInit(): void {
  }

  nameCreate: string = "";
  contentCreate: string = "";

  crea() {
    if (this.checkValidity()) {
      this.contractSrv.crea(this.nameCreate, this.contentCreate).then(
        created => {
          //...
        }).catch(error => {
          console.log("Errore durante il recupero dei risultati: CreateComponent.crea()" + error);
        })
    }
  }

  checkValidity(): boolean {
    if(this.nameCreate == "" || this.contentCreate == ""){
      Swal.fire("Attenzione!", "Cerchiamo sempre di inserire risorce con un nome ed un contenuto, aiutaci :)", 'error');
      return false;
    }

    let resources = this.resourceSrv.getResources();
    if (resources == undefined || resources.length == 0) {
      return true;
    } else {
      for (let x = 0; x < resources.length; x++) {
        if (resources[x].name == this.nameCreate) {
          Swal.fire("Attenzione!", "Impossibile inserire due risorse con lo stesso nome", 'error');
          return false;
        }
      }
    }
    return true;
  }
}
