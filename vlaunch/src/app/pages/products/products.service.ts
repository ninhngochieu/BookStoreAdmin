import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AlertService } from 'src/app/core/alert.service';
import { HttpService } from 'src/app/core/http.service';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpService, private alertService: AlertService) {}

  public params = {};
  public productData$ = new Subject<Object>();

  getProductList(page?: number) {
    let url = 'product?limit=10';
    
    for (let key in this.params) {
      let value = this.params[key];
      if (value && value != '') {
        url += `&${key}=${value}`;
      }
    }

    if (page) url = url + '&page=' + page;
    this.alertService.showProgress();

    this.http.get(url).subscribe((res) => {
      if (res && res.success) {
        this.productData$.next(res.data);
      } else {
        this.alertService.errorAlert(res);
      }

      this.alertService.hideProgress();
    });
  }
}
