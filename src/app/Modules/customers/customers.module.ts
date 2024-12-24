import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { EmptyStateComponent } from '@Shared/components/empty-state/empty-state.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from '@Shared/components/table/table.component';
import { CustomersComponent } from './customers/customers.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { ErrorLoadingComponent } from '@Shared/components/error-loading/error-loading.component';



const routes: Routes = [
  {
    path: '',
    component: CustomersComponent
  },
  {
    path: 'view',
    component: ViewCustomerComponent
  }
];

@NgModule({
  declarations: [
    CustomersComponent,
    ViewCustomerComponent
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
    ErrorLoadingComponent
  ]
})
export class CustomersModule { }
