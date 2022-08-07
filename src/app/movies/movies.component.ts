import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { MovieRepository } from '../models/movie.repository';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  //  movies = ['film 1', 'film 2', 'film 3', 'film 4'];
  title = 'Film Listesi';
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];

  filterText: string = '';
  // Constructor component oluşturulduğunda çalışır
  constructor(private alertify: AlertifyService, private http: HttpClient) {}
  // Component oluşturuluduktan çağrılmadan hemen önce çalıştırılır
  ngOnInit(): void {
    this.http.get<Movie[]>('http://localhost:3000/movies').subscribe((data) => {
      this.movies = data;
      this.filteredMovies = this.movies;
      console.log(this.movies);
      console.log(this.filteredMovies);
    });
    this.http
      .get('https://jsonplaceholder.typicode.com/users')
      .subscribe((data) => {
        console.log(data);
      });
  }

  onInputChange() {
    this.filteredMovies = this.filterText
      ? this.movies.filter(
          (m) =>
            m.title.indexOf(this.filterText) !== -1 ||
            m.description.indexOf(this.filterText) !== -1
        )
      : this.movies;
  }

  addToList($event: any, movie: Movie) {
    // console.log('Button Click', movie.title);
    // console.log('Event', $event.target.classList);
    if ($event.target.classList.contains('btn-primary')) {
      $event.target.innerText = 'Listeden Çıkar';
      $event.target.classList.remove('btn-primary');
      $event.target.classList.add('btn-danger');
      this.alertify.success(movie.title + 'listene eklendi');
    } else {
      $event.target.innerText = 'Listeye Ekle';
      $event.target.classList.remove('btn-danger');
      $event.target.classList.add('btn-primary');
      this.alertify.error(movie.title + 'listeden Çıkarıldı');
    }
  }
}
