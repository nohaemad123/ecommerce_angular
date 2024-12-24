import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductsSaleComponent } from './products-sale/products-sale.component';
import { TranslocoModule } from '@ngneat/transloco';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from '@Shared/components/table/table.component';
import { CategoriesSalesComponent } from './categories-sales/categories-sales.component';
import { BrandsSalesComponent } from './brands-sales/brands-sales.component';
import { CouponsSalesComponent } from './coupons-sales/coupons-sales.component';
import { CitiesSalesComponent } from './cities-sales/cities-sales.component';
import { EmptyStateComponent } from "../../@Shared/components/empty-state/empty-state.component";
import { NgSelectModule } from '@ng-select/ng-select';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { ErrorLoadingComponent } from '@Shared/components/error-loading/error-loading.component';


const routes: Routes = [
  {path: '', pathMatch : 'full', redirectTo: 'Products-Sales'},

  {
    path: 'Products-Sales',
    component: ProductsSaleComponent
  },
  {
    path: 'Categories-Sales',
    component: CategoriesSalesComponent
  },
  {
    path: 'Brands-Sales',
    component: BrandsSalesComponent
  },
  {
    path: 'Coupons-Sales',
    component: CouponsSalesComponent
  },
  {
    path: 'Cities-Sales',
    component: CitiesSalesComponent
  }

];
@NgModule({
    declarations: [
        ProductsSaleComponent,
        CategoriesSalesComponent,
        BrandsSalesComponent,
        CouponsSalesComponent,
        CitiesSalesComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TranslocoModule,
        FormsModule,
        ReactiveFormsModule,
        TableComponent,
        EmptyStateComponent,
        NgSelectModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        ErrorLoadingComponent
    ]
})
export class ReportingModule { }
