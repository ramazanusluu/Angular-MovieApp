import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthResponse } from '../models/AuthResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  api_key = 'AIzaSyAvgSX9ZfuAtJYOCb4uwExc3CUP5WBXFl8';

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          this.api_key,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          this.api_key,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError));
  }
  private handleError(response: HttpErrorResponse) {
    let message = 'Hata Oluştu';

    if (!navigator.onLine) {
      message = 'İnternet BaĞLANTINIZ YOK';
      return throwError(message);
    }

    if (response.error.error) {
      switch (response.error.error.message) {
        case 'EMAIL_EXISTS':
          message = 'Mail Adresi Kullanılmış';
          break;
        case 'EMAIL_NOT_FOUND':
          message = 'Mail Adresi Bulunamadı';
          break;
        case 'INVALID_PASSWORD':
          message = 'Hatalı Password';
          break;
      }
    }
    return throwError(message);
  }
}
