import { Injectable } from '@angular/core';
import {AlertService} from '../../core/alert.service';
import {HttpService} from '../../core/http.service';
import {BehaviorSubject} from 'rxjs';
import {BookProfile} from '../../models/book';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProductModifyService {

  private bookSubject = new BehaviorSubject(new Array(new BookProfile()));
   book = this.bookSubject.asObservable();

  constructor(private alertService: AlertService, private httpService: HttpService, private matSnackBar: MatSnackBar) { }

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
    const updateStatusBook = {private: statusBook, id};
    const formData = new FormData();
    for (const updateStatusBookKey in updateStatusBook) {
        formData.append(updateStatusBookKey, updateStatusBook[updateStatusBookKey]);
    }
    this.httpService.putHandle(url, formData).subscribe(res => {
      if (!res.success) {
        this.alertService.errorAlert(res);
      }else {
        if (!statusBook){
          this.matSnackBar.open('Đã kích hoạt', 'Close', {
            duration: 3000
          });
        }else{
          this.matSnackBar.open('Đã vô hiệu hoá',  'Close', {
            duration: 3000
          });
        }
      }
    });
  }
}
