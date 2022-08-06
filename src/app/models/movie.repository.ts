import { Movie } from './movie';

export class MovieRepository {
  private movies: Movie[];

  constructor() {
    this.movies = [
      {
        id: 1,
        title: 'film 1',
        description: 'Film 1 açıklama',
        imageUrl: '1.jpeg',
        isPopular: false,
        datePublished: new Date(1990, 10, 10),
      },
      {
        id: 2,
        title: 'film 2',
        description: 'Film 2 açıklama',
        imageUrl: '2.jpeg',
        isPopular: true,
        datePublished: new Date(1990, 10, 10),
      },
      {
        id: 3,
        title: 'film 3',
        description: 'Film 3 açıklama',
        imageUrl: '3.jpeg',
        isPopular: false,
        datePublished: new Date(1990, 10, 10),
      },
      {
        id: 4,
        title: 'film 4',
        description: 'Film 4 açıklama',
        imageUrl: '4.jpeg',
        isPopular: true,
        datePublished: new Date(1990, 10, 10),
      },
      {
        id: 5,
        title: 'film 5',
        description: 'Film 5 açıklama',
        imageUrl: '5.jpeg',
        isPopular: true,
        datePublished: new Date(1990, 10, 10),
      },
    ];
  }
  getMovies(): Movie[] {
    return this.movies;
  }
  getPopularMovies(): Movie[] {
    return this.movies.filter((i) => i.isPopular);
  }
  getMovieById(id: number): Movie {
    return this.movies.find((i) => i.id == id);
  }
}
