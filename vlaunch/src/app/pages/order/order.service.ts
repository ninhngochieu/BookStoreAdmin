import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../../core/http.service';
import * as url from 'url';
import {BehaviorSubject} from 'rxjs';
import {Invoice} from './order.component';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpService: HttpService, private matSnackBar: MatSnackBar) { }

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
      if (res.success){
        this.invoiceSubject.next(res.data);
      }else {
        this.matSnackBar.open(res.error_message, 'Close', {
          duration: 2000
        });
      }
    });
  }

  acceptInvoice(id): any {
    const url1 = 'Invoice/AcceptInvoiceAdmin/' + id;
    this.httpService.postHandle(url1).subscribe(res => {
      if (res.success){
        this.invoiceSubject.next(res.data);
      }else {
        this.matSnackBar.open(res.error_message, 'Close', {
          duration: 2000
        });
      }
    });
  }
}
