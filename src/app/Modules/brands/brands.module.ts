import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrandsComponent } from './brands/brands.component';
import { NewBrandComponent } from './new-brand/new-brand.component';
import { EmptyStateComponent } from '@Shared/components/empty-state/empty-state.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from '@Shared/components/table/table.component';
import { UploadImageComponent } from '@Shared/components/upload-image/upload-image.component';
import { ErrorLoadingComponent } from '@Shared/components/error-loading/error-loading.component';



const routes: Routes = [
  {
    path: '',
    component: BrandsComponent
  },
  {
    path: 'New',
    component: NewBrandComponent
  }
];

@NgModule({
  declarations: [
    BrandsComponent,
    NewBrandComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TranslocoModule,
    // CarouselModule,
    EmptyStateComponent,
    FormsModule,
    ReactiveFormsModule,
    TableComponent,
    UploadImageComponent,
    ErrorLoadingComponent
  ]
})
export class BrandsModule { }
