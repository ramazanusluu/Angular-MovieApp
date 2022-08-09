import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full',
  },
  {
    path: 'movies',
    component: MoviesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'movies/category/:categoryId',
    component: MoviesComponent,
  },
  {
    path: 'movies/create',
    component: MovieCreateComponent,
  },
  {
    path: 'categories/create',
    component: CategoryCreateComponent,
  },
  {
    path: 'movies/:movieId',
    component: MovieDetailsComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
