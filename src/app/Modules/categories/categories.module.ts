import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { EmptyStateComponent } from '@Shared/components/empty-state/empty-state.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriesComponent } from './categories/categories.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { TableComponent } from '@Shared/components/table/table.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { UploadImageComponent } from '@Shared/components/upload-image/upload-image.component';
import { ErrorLoadingComponent } from '@Shared/components/error-loading/error-loading.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent
  },
  {
    path: 'New',
    component: NewCategoryComponent
  }
];

@NgModule({
  declarations: [CategoriesComponent, NewCategoryComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TranslocoModule,
    CarouselModule,
    EmptyStateComponent,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    TableComponent,
    UploadImageComponent,
    ErrorLoadingComponent
  ]
})
export class CategoriesModule { }
