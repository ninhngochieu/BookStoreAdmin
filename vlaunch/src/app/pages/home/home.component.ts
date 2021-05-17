import {AfterViewInit, Component, DoCheck, OnInit} from '@angular/core';
import { UserProfile } from 'src/app/models/user_profile';
import { AuthService } from 'src/app/modules/auth/auth.service';
import {OrderService} from '../order/order.service';
import {Invoice} from '../order/order.component';
import {ProductService} from "../products/products.service";
import {ProductModifyService} from "../product-modify/product-modify.service";
import {BookProfile} from "../../models/book";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private invoiceList: Invoice[] = [];
  private bookList: BookProfile[] = [];
  constructor(public authService: AuthService, private orderService: OrderService, private productService: ProductModifyService) {}

  profile: UserProfile;

  ngOnInit(): void {
    this.authService.profile.subscribe((profile) => {
      this.profile = profile;
    });
    this.orderService.getAllInvoice();
    this.orderService.$invoice.subscribe(res => {
      this.invoiceList = res;
    });
    this.productService.getAllBook();
    this.productService.book.subscribe(res => {
      this.bookList = res;
      console.log(res);
    });
  }

  getTotalInvoice(): any {
    let sum = 0;
    this.invoiceList.forEach(x => {
      sum += 1;
    });
    return sum;
  }

  getProcessInvoice(): any {
    let sum = 0;
    this.invoiceList.forEach(x => {
      if (x.statusId === 1){
        sum += 1;
      }
    });
    return sum;
  }

  getSuccessInvoice(): any{
    let sum = 0;
    this.invoiceList.forEach(x => {
      if (x.statusId === 2){
        sum += 1;
      }
    });
    return sum;
  }

  getCancelInvoice(): any {
    let sum = 0;
    this.invoiceList.forEach(x => {
      if (x.statusId === 3){
        sum += 1;
      }
    });
    return sum;
  }

  getTotalMoney(): any {
    let sum = 0;
    this.invoiceList.forEach(x => {
      if (x.statusId === 2){
        sum += x.totalMoney;
      }
    });
    return sum;
  }

  getActiveProduct(): any {
    let sum = 0;
    this.bookList.forEach(x => {
      if (!x.private){
        sum += 1;
      }
    });
    return sum;
  }

  getOutstockProduct(): any {
    let sum = 0;
    this.bookList.forEach(x => {
      if (x.quantity === 0){
        sum += 1;
      }
    });
    return sum;
  }

  getPrivateProduct(): any {
    let sum = 0;
    this.bookList.forEach(x => {
      if (x.private){
        sum += 1;
        console.log(x)
      }
    });
    return sum;
  }
}
