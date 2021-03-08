import { Injectable } from '@angular/core';
import {AlertService} from '../../core/alert.service';
import {HttpService} from '../../core/http.service';
import {BehaviorSubject} from 'rxjs';
import {BookProfile} from '../../models/book';

@Injectable({
  providedIn: 'root'
})
export class ProductModifyService {

  private bookSubject = new BehaviorSubject(new Array(new BookProfile()));
   book = this.bookSubject.asObservable();

  constructor(private alertService: AlertService, private httpService: HttpService) { }

  getAllBook(): any {
    const url = 'Books';
    this.httpService.getHandle(url).subscribe((res) => {
      if (res.success) {
        this.bookSubject.next(res.data);
      } else {
        this.alertService.errorAlert({error_message: 'Có lỗi trong quá trình lấy thông tin sách'});
      }
    });
  }

  changeStatusBook(id, statusBook: boolean): any {
    const url = 'Books';
    this.httpService.putHandle(url, {private: statusBook, id}).subscribe(res => {
      if (!res.success) {
        this.alertService.errorAlert(res);
      }
    });
  }
}
