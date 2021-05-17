import {AfterViewInit, Component, DoCheck, OnInit} from '@angular/core';
import { UserProfile } from 'src/app/models/user_profile';
import { AuthService } from 'src/app/modules/auth/auth.service';
import {OrderService} from '../order/order.service';
import {Invoice} from '../order/order.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private invoiceList: Invoice[] = [];
  constructor(public authService: AuthService, private orderService: OrderService) {}

  profile: UserProfile;

  ngOnInit(): void {
    this.authService.profile.subscribe((profile) => {
      this.profile = profile;
    });
    this.orderService.getAllInvoice();
    this.orderService.$invoice.subscribe(res => {
      this.invoiceList = res;
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
}
