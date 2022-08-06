import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { MovieRepository } from '../models/movie.repository';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  //  movies = ['film 1', 'film 2', 'film 3', 'film 4'];
  title = 'Film Listesi';
  movies: Movie[];
  filteredMovies: Movie[];
  // popularMovies: Movie[];
  movieRepository: MovieRepository;
  today = new Date();
  filterText: string = '';
  constructor() {
    this.movieRepository = new MovieRepository();
    this.movies = this.movieRepository.getMovies();
    // this.popularMovies = this.movieRepository.getPopularMovies();
    this.filteredMovies = this.movies;
  }

  ngOnInit(): void {}

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
    } else {
      $event.target.innerText = 'Listeye Ekle';
      $event.target.classList.remove('btn-danger');
      $event.target.classList.add('btn-primary');
    }
  }
}
