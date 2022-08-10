import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((response: HttpErrorResponse) => {
        let message = 'Hata oluştu';

        if (!navigator.onLine) {
          message = 'İnternet BaĞLANTINIZ YOK';
          return throwError(message);
        }

        if (response.error.error) {
          if (response.status === 401) {
            message = 'Yetkiniz yok';
            console.log(message);
            return throwError(message);
          }
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
      })
    );
  }
}
