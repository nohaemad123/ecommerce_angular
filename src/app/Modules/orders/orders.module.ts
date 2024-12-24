import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders/orders.component';
import { RouterModule, Routes } from '@angular/router';
import { ViewOrderComponent } from './view-order/view-order.component';
import { TranslocoModule } from '@ngneat/transloco';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { EmptyStateComponent } from '@Shared/components/empty-state/empty-state.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from '@Shared/components/table/table.component';
import { ErrorLoadingComponent } from '@Shared/components/error-loading/error-loading.component';
import { popupComponent } from '@Shared/components/popup/popup.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent
  },
  {
    path: 'view',
    component: ViewOrderComponent
  }
];

@NgModule({
  declarations: [OrdersComponent, ViewOrderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslocoModule,
    CarouselModule,
    EmptyStateComponent,
    FormsModule,
    ReactiveFormsModule,
    TableComponent,
    ErrorLoadingComponent,
    popupComponent
  ]
})
export class OrdersModule { }
