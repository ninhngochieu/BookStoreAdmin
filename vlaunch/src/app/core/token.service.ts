import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private payload: any;
  constructor() {
    this.payload = jwtDecode(this.getToken());
  }

  protected getToken(): string {
    const token = localStorage.getItem('token');
    return token ? token : null;
  }

  getUserId(): string {
    return this.payload.id;
  }
}
