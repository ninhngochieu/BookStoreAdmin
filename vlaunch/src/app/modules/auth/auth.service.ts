import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserProfile } from 'src/app/models/user_profile';
import { AlertService } from '../../core/alert.service';
import { HttpService } from '../../core/http.service';
import {TokenService} from '../../core/token.service';

const internetError = 'Mạng không ổn định, xin vui lòng kiểm tra lại mạng';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpService: HttpService,
    private alertService: AlertService,
    private router: Router,
    private tokenService: TokenService,
  ) {
    this.checkLogin();
  }

  private profileSubject = new BehaviorSubject(new UserProfile());
  profile = this.profileSubject.asObservable();

  isLogin = false;
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  checkLogin(): void {
    const token = localStorage.getItem('token');
    this.isLogin = token && token !== '';
  }

  login(data): void {
    const url = 'userauth/login';
    this.httpService.postHandle(url, data).subscribe(
      (res) => {
        if (res && res.success){
          this.isLogin = true;
          this.tokenService.setToken(res.data.access);
          this.tokenService.setRefreshToken(res.data.refresh);
          this.router.navigateByUrl('/dashboard');
        }else {
          this.alertService.errorAlert(res);
        }
      }
    );
  }

  logout(): void {
    this.isLogin = false;
    localStorage.clear();
    this.router.navigateByUrl('/auth/login').then(r => r);
  }

  getProfile(): any {
    const url = 'userauth/profile/' + this.tokenService.getUserId();
    this.httpService.get(url).subscribe((res) => {
      if (res?.success) {
        this.profileSubject.next({...res.data});
      } else {
        this.alertService.errorAlert(res);
        return null;
      }
    });
  }

  updateProfile(data: FormData): any {
    const url = 'userauth/profile/' + this.tokenService.getUserId();
    this.httpService.putHandle(url, data).subscribe(
      res => {
          if (res.success){
            this.profileSubject.next({ ...res.data });
            this.alertService.successAlert('Cập nhật thông tin cá nhân thành công.');
          }else {
            this.alertService.errorAlert(res);
          }
      }
    );
    // this.httpService.put(url, data).subscribe((res) => {
    //   if (res && res.success) {
    //     this.profileSubject.next({ ...res.data });
    //     this.alertService.successAlert(
    //       'Cập nhật thông tin cá nhân thành công.'
    //     );
    //   } else {
    //     this.alertService.errorAlert(res);
    //   }
    // });
    // this.httpService.putModify(url, data).subscribe(
    //   (res) => {
    //     if (res && res.success){
    //       this.profileSubject.next({ ...res.data });
    //       this.alertService.successAlert(res.message);
    //       console.log(res);
    //     }
    //   },
    //   (err) => {
    //     console.log(err);
    //     if (err.status === 401){ // Hết hạn token thì xin cái mới
    //       this.httpService.refreshTokenModify().subscribe(
    //         (resToken) => {
    //           console.log(resToken);
    //           this.tokenService.setToken(resToken.data.access);
    //           this.tokenService.setRefreshToken(resToken.data.refresh);
    //         },
    //         (errToken) => {
    //           console.log(errToken);
    //           if (errToken.status === 401) {
    //             errToken.error_message = 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại';
    //             this.alertService.errorAlert(errToken);
    //             this.tokenService.clear();
    //           }
    //         }
    //       );
    //     }
    //     if (err.status === 0){
    //       err.error_message = internetError;
    //       this.alertService.errorAlert(err);
    //     }
    //   }
    // );
  }

  changePassword(data: any): any {
    const url = 'userauth/change-password/' + this.tokenService.getUserId();
    // this.httpService.put(url, data).subscribe((res) => {
    //   if (res && res.success) {
    //     this.profileSubject.next({ ...res.data });
    //     this.alertService.successAlert('Đổi mật khẩu thành công');
    //   } else {
    //     this.alertService.errorAlert(res);
    //   }
    // });
    // this.httpService.putModify(url, data).subscribe(
    //   (res) => {
    //     this.profileSubject.next({...res.data});
    //     this.alertService.successAlert('Đổi mật khẩu thành công');
    //   },
    //   (err) => {
    //     err.error_message = 'Đổi mật khẩu thất bại. Vui lòng thử lại!';
    //     // this.alertService.errorAlertModify(err);
    //   }
    // );
    this.httpService.putHandle(url, data).subscribe((res) => {
      if (res && res.success) {
        this.profileSubject.next({ ...res.data });
        this.alertService.successAlert('Đổi mật khẩu thành công');
      } else {
        this.alertService.errorAlert(res);
      }
    });
  }

  getAllBook(): any {
    const url = 'Books';
    this.httpService.getHandle(url).subscribe(
      (res) => {
        if (res.success){
          return res.data;
        }else {
          return this.alertService.errorAlert({error_message: 'Lấy thông tin sách thất bại'});
        }
      }
    );
  }
}
