import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from './movie.model';
import { AlertifyService } from '../shared/alertify.service';
import { AuthService } from '../auth/auth.service';
import { MovieService } from './movie.service';

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
  movieList: string[] = [];

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
      if (user) {
        this.userId = user.id;

        this.activetedRoute.params.subscribe((params) => {
          this.loading = true;
          this.movieService.getMovies(params['categoryId']).subscribe(
            (data) => {
              this.movies = data;
              this.filteredMovies = this.movies;
              this.movieService.getList(this.userId).subscribe((data) => {
                this.movieList = data;
                console.log(this.movieList);
              });
              this.loading = false;
            },
            (error) => {
              this.error = error;
              this.loading = false;
            }
          );
        });
      }
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

  getButtonState(movie: Movie) {
    return this.movieList.findIndex((m) => m === movie.id) > -1;
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
