import { Injectable } from '@angular/core';
import {HttpService} from '../../core/http.service';
import {BehaviorSubject} from 'rxjs';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {

  constructor(private httpService: HttpService) { }
  private userSubject = new BehaviorSubject(new Array(new User()));
  user = this.userSubject.asObservable();
  getAllUserInfo(): any{

    const url = 'UserAuth';
    this.httpService.getHandle(url).subscribe(res => {
      this.userSubject.next(res.data);
    });
  }
}
