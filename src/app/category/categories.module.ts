import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryComponent } from './category.component';

@NgModule({
  declarations: [CategoryComponent, CategoryCreateComponent],
  imports: [
    FormsModule,
    RouterModule.forChild([
      {
        path: 'categories/create',
        component: CategoryCreateComponent,
      },
    ]),
    SharedModule
  ],
  exports: [CategoryComponent, CategoryCreateComponent],
})
export class CategoriesModule {}
