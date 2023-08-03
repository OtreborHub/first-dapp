import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InfuraResponse } from '../utils/infura-response';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  //INFURA
  getBlockNumber(): Observable<InfuraResponse>{
    const endpoint = "https://rinkeby.infura.io/v3/044895efc15547e1a27042c1d2874de0";
    const body = {"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}
    return this.http.post<InfuraResponse>(endpoint, body);
  }
}
