import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../models/movie';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers: [MovieService],
})
export class MoviesComponent implements OnInit {
  //  movies = ['film 1', 'film 2', 'film 3', 'film 4'];
  title = 'Film Listesi';
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  filterText: string = '';
  error: any;
  loading: boolean = false;
  userId: string;

  // Constructor component oluşturulduğunda çalışır
  constructor(
    private alertify: AlertifyService,
    private movieService: MovieService,
    private activetedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}
  // Component oluşturuluduktan çağrılmadan hemen önce çalıştırılır
  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.userId = user.id;
    });
    this.activetedRoute.params.subscribe((params) => {
      this.loading = true;
      this.movieService.getMovies(params['categoryId']).subscribe(
        (data) => {
          this.movies = data;
          this.filteredMovies = this.movies;
          this.loading = false;
        },
        (error) => {
          this.error = error;
          this.loading = false;
        }
      );
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
      this.movieService
        .addToMyList({
          userId: this.userId,
          movieId: movie.id,
        })
        .subscribe(() =>
          this.alertify.success(movie.title + 'listene eklendi')
        );
    } else {
      $event.target.innerText = 'Listeye Ekle';
      $event.target.classList.remove('btn-danger');
      $event.target.classList.add('btn-primary');
      this.movieService
        .removeFromList({
          userId: this.userId,
          movieId: movie.id,
        })
        .subscribe(() =>
          this.alertify.error(movie.title + 'listeden Çıkarıldı')
        );
    }
  }
}
