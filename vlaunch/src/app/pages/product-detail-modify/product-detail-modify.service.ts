import { Injectable } from '@angular/core';
import {HttpService} from '../../core/http.service';
import {AlertService} from '../../core/alert.service';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailModifyService {
  private categorySubject = new BehaviorSubject([]);
  category = this.categorySubject.asObservable();

  private authorSubject = new BehaviorSubject([]);
  author = this.authorSubject.asObservable();

  constructor(private httpService: HttpService, private alertService: AlertService) {
  }
  getAllCategory(): any {
    const url = 'Category/GetAllCategories';
    this.httpService.getHandle(url).subscribe(res => {
      if (res.success){
        this.categorySubject.next(res.data);
      }else {
        res.error_message = 'Lỗi khi đọc danh sách nhà xuất bản';
        this.alertService.errorAlert(res);
      }
    });
  }

  getAllAuthor(): any {
    const url = 'Author';
    this.httpService.getHandle(url).subscribe(res => {
      if (res.success){
        console.log(res);
        this.authorSubject.next(res.data);
      }else {
        res.error_message = 'Lỗi khi đọc danh sách tác giả';
        this.alertService.errorAlert(res);
      }
    });
  }
}
