import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService { // Tạo Http Services, có thể dùng Token Interceptor
  constructor(private http: HttpClient) {}

  private DOMAIN = environment.API_DOMAIN; // config in environment file

  private getHttpOptions(): any {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (!(token == null)) {
      headers = headers.append('Authorization', 'Bearer ' + token);
    }
    return {
      headers,
    };
  }

  handleError<T>(): any {
    return (error: any): Observable<any> => {
      console.error(error);
      if (error.name === 'TimeoutError') {
        return of({
          error_code: 'time_out',
          error_message:
            'Kết nối mạng không ổn định, vui lòng kiểm tra lại đường truyền.',
          success: false,
        });
      }

      return of(null);
    };
  }

  get(url): Observable<any> {
    return this.request('get', url).pipe(
      switchMap((res) => this.checkNotAuthenticated(res, () => this.get(url)))
    );
  }

  post(url, data?): Observable<any> {
    return this.request('post', url, data).pipe(
      switchMap((res) =>
        this.checkNotAuthenticated(res, () => this.post(url, data))
      )
    );
  }

  put(url, data?): Observable<any> {
    return this.request('put', url, data).pipe(
      switchMap((res) =>
        this.checkNotAuthenticated(res, () => this.put(url, data))
      )
    );
  }

  delete(url): Observable<any> {
    return this.request('delete', url).pipe(
      switchMap((res) =>
        this.checkNotAuthenticated(res, () => this.delete(url))
      )
    );
  }

  request(method: string, url: string, data?: object): Observable<any> {
    const options = this.getHttpOptions();
    let response: Observable<any>;

    switch (method) {
      case 'get':
        response = this.http
          .get(this.DOMAIN + url, options)
          .pipe(timeout(60000), catchError(this.handleError()));
        break;
      case 'post':
        response = this.http
          .post(this.DOMAIN + url, data, options)
          .pipe(timeout(60000), catchError(this.handleError()));
        break;
      case 'put':
        response = this.http
          .put(this.DOMAIN + url, data, options)
          .pipe(timeout(60000), catchError(this.handleError()));
        break;
      case 'delete':
        response = this.http
          .delete(this.DOMAIN + url, options)
          .pipe(timeout(60000), catchError(this.handleError()));
        break;
    }

    return response;
  }

  private async checkNotAuthenticated(res, callback?: any, data?: object): Promise<any> {
    if (!res) { return res; }
    if (!res.success && res.error_code === 'not_authenticated') {
      const refresh = window.localStorage.getItem('refreshToken');
      if (!refresh || refresh === '') {
        return {
          error_code: 'token_not_valid',
          error_message: 'Phiên đăng nhập đã hết hạn vui lòng đăng nhập lại.',
        };
      } else if (refresh) {
        const result = await this.refreshToken(refresh).toPromise();
        if (result.success) {
          window.localStorage.setItem('token', result.data.access);
          window.localStorage.setItem('refreshToken', result.data.refresh);
          return await callback().toPromise();
        } else {
          return result;
        }
      }
    }
    return res;
  }

  private refreshToken(refresh): any {
    return this.request('post', 'auth/UserAuth/refresh', { refresh });
  }
}
