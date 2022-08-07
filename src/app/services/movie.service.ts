import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Movie } from '../models/movie';

@Injectable()
export class MovieService {
  url = 'http://localhost:3000/movies';
  constructor(private http: HttpClient) {}
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.url).pipe(
      tap((data) => console.log(data)),
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client yada network
      console.log('error: ', error.error.message);
    } else {
      //Backend hatası
      switch (error.status) {
        case 404:
          console.log('Not Found');
          break;
        case 403:
          console.log('Access denied');
          break;
        case 500:
          console.log('interval service');
          break;
        default:
          console.log('Bilinmeyen bir hata');
          break;
      }
    }
    return throwError('Bir hata Oluştu');
  }
}
