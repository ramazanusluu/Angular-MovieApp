import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css'],
  providers: [CategoryService],
})
export class MovieCreateComponent implements OnInit {
  categories: Category[];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  createMovie(title: any, description: any, imageUrl: any, categoryId: any) {
    console.log(title.value);
    console.log(description.value);
    console.log(imageUrl.value);
    console.log(categoryId.value);
  }
}
