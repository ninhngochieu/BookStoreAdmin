import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../../core/http.service';
import * as url from 'url';
import {BehaviorSubject} from 'rxjs';
import {Invoice} from './order.component';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpService: HttpService) { }

  invoiceSubject = new BehaviorSubject(new Array(new Invoice()));
  $invoice = this.invoiceSubject.asObservable();
  getAllInvoice(): any {
    const url1 = 'Invoice';
    this.httpService.getHandle(url1).subscribe(res => {
      this.invoiceSubject.next(res);
    });
  }

  cancelInvoice(id): any {
    const url1 = 'Invoice/CancelInvoiceAdmin/' + id;
    this.httpService.postHandle(url1).subscribe(res => {
      this.invoiceSubject.next(res);
    });
  }

  acceptInvoice(id): any {
    const url1 = 'Invoice/AcceptInvoiceAdmin/' + id;
    this.httpService.postHandle(url1).subscribe(res => {
      this.invoiceSubject.next(res);
    });
  }
}
