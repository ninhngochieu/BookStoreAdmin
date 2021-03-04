import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private payload: any;
  constructor() {

  }

  protected getToken(): string {
    const token = localStorage.getItem('token');
    return token ? token : null;
  }

  getUserId(): string {
    this.payload = jwtDecode(this.getToken());
    return this.payload.id;
  }

  hasToken(): any {
    return  localStorage.getItem('token');
    return false;
  }
}
