import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { Movie } from '../models/movie';
import { MyList } from '../models/myList';

@Injectable()
export class MovieService {
  url = 'http://localhost:3000/movies';
  url_firebase = 'https://angular-movie-app-3580b-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) {}

  getMovies(categoryId: number): Observable<Movie[]> {
    // let newUrl = this.url_firebase + 'movies.json';

    // if (categoryId) {
    //   newUrl += '?categoryId=' + categoryId;
    // }

    return this.http.get<Movie[]>(this.url_firebase + 'movies.json').pipe(
      map((response) => {
        const movies: Movie[] = [];

        for (const key in response) {
          if (categoryId) {
            if (categoryId === response[key].categoryId) {
              movies.push({ ...response[key], id: key });
            }
          } else {
            movies.push({ ...response[key], id: key });
          }
        }

        return movies;
      }),
      tap((data) => console.log(data)),
      catchError(this.handleError),
      delay(500)
    );
  }

  getMovieById(movieId: string): Observable<Movie> {
    return this.http
      .get<Movie>(this.url_firebase + 'movies/' + movieId + '.json')
      .pipe(
        tap((data) => console.log(data)),
        catchError(this.handleError),
        delay(500)
      );
  }

  createMovie(movie: Movie): Observable<Movie> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token',
      }),
    };
    return this.http
      .post<Movie>(this.url_firebase + 'movies.json', movie, httpOptions)
      .pipe(
        tap((data) => console.log(data)),
        catchError(this.handleError)
      );
  }

  addToMyList(item: MyList): Observable<MyList> {
    return this.http
      .post<MyList>(
        this.url_firebase +
          '/users/' +
          item.userId +
          '/list/' +
          item.movieId +
          '.json',
        {
          dateAdded: new Date().getTime(),
        }
      )
      .pipe(
        tap((data) => console.log(data)),
        catchError(this.handleError)
      );
  }

  removeFromList(item: MyList): Observable<MyList> {
    return this.http
      .delete<MyList>(
        this.url_firebase +
          '/users/' +
          item.userId +
          '/list/' +
          item.movieId +
          '.json'
      )
      .pipe(
        tap((data) => console.log(data)),
        catchError(this.handleError)
      );
  }

  getList(userId: string): Observable<string[]> {
    return this.http
      .get<string[]>(this.url_firebase + '/users/' + userId + '/list.json')
      .pipe(
        map((response) => {
          const movies: string[] = [];

          for (const key in response) {
            movies.push(key);
          }

          return movies;
        }),
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
