import { Injectable } from '@angular/core';
import {HttpService} from '../../core/http.service';
import {BehaviorSubject} from 'rxjs';
import {Role, User} from '../../models/user';
import {AuthService} from '../../modules/auth/auth.service';
import {Response} from '../../models/response';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {

  constructor(private httpService: HttpService) { }
  private userSubject = new BehaviorSubject(new Array(new User()));
  user = this.userSubject.asObservable();

  private roleSubject = new BehaviorSubject(new Array(new Role()));
  role = this.roleSubject.asObservable();

  private statusAndRoleSubject = new BehaviorSubject(new Response());
  statusAndRole = this.statusAndRoleSubject.asObservable();

  getAllUserInfo(): any{
    const url = 'UserAuth';
    this.httpService.getHandle(url).subscribe(res => {
      this.userSubject.next(res.data);
    });
  }

  getAllRole(): any {
    const url = 'Role';
    this.httpService.getHandle(url).subscribe(res => {
      this.roleSubject.next(res.data);
    });
  }

  UpdateStatusAndRole(id, formData: FormData): any {
    const url = 'UserAuth/UpdateStatusAndRole';
    this.httpService.putHandle(url, formData).subscribe(res => {
      console.log(res);
      this.statusAndRoleSubject.next(res);
   });
  }
}
