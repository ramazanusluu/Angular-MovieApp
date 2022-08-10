import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CategoryComponent } from './category/category.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertifyService } from './services/alertify.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { AuthComponent } from './auth/auth.component';
import { ErrorInterceptor } from './services/error.interceptor';
import { AuthInterceptor } from './services/auth.interceptor';
import { AlertComponent } from './shared/alert/alert.component';
import { MoviesModule } from './movies/movies.module';

@NgModule({
  declarations: [
    //component
    AppComponent,
    NavbarComponent,
    CategoryComponent,
    FooterComponent,
    CategoryCreateComponent,
    AuthComponent,
    AlertComponent,
  ],
  imports: [
    //module
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MoviesModule,
  ],
  providers: [
    AlertifyService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ], //services
  bootstrap: [AppComponent], //Starter Component
})
export class AppModule {}
