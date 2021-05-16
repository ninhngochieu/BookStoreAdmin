import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../../core/http.service';
import * as url from 'url';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpService:HttpService) { }

  getAllInvoice() {
    const url1 = 'Invoice';
    return this.httpService.getHandle(url1);
  }
}
