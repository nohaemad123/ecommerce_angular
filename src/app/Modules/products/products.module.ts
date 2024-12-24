import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { EmptyStateComponent } from '@Shared/components/empty-state/empty-state.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from '@Shared/components/table/table.component';
import { UploadImageComponent } from '@Shared/components/upload-image/upload-image.component';
import { ProductsComponent } from './products/products.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ProductInfoFormComponent } from './components/product-info-form/product-info-form.component';
import { ProductImagesFormComponent } from './components/product-images-form/product-images-form.component';
import { ProductVariantsFormComponent } from './components/product-variants-form/product-variants-form.component';
import { ProductMarketingFormComponent } from './components/product-marketing-form/product-marketing-form.component';
import { ProductFaqsFormComponent } from './components/product-faqs-form/product-faqs-form.component';
import { ProductSeoFormComponent } from './components/product-seo-form/product-seo-form.component';
import { NgSelectModule } from '@ng-select/ng-select';

const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'List'
  },
  {
    path: 'List',
    component: ProductsComponent
  },
  {
    path: 'List/New',
    component: NewProductComponent
  }
];

@NgModule({
  declarations: [
    ProductsComponent,
    NewProductComponent,
    ProductInfoFormComponent,
    ProductImagesFormComponent,
    ProductVariantsFormComponent,
    ProductMarketingFormComponent,
    ProductSeoFormComponent,
    ProductFaqsFormComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TranslocoModule,
    CarouselModule,
    EmptyStateComponent,
    FormsModule,
    ReactiveFormsModule,
    TableComponent,
    UploadImageComponent,
    NgSelectModule
  ]
})
export class ProductsModule { }
