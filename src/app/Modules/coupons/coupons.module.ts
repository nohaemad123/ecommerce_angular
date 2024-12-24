import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CouponsComponent } from './coupons/coupons.component';
import { NewCouponsComponent } from './new-coupons/new-coupons.component';
import { TranslocoModule } from '@ngneat/transloco';
import { EmptyStateComponent } from '@Shared/components/empty-state/empty-state.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadImageComponent } from '@Shared/components/upload-image/upload-image.component';
import { TableComponent } from '@Shared/components/table/table.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { ErrorLoadingComponent } from '@Shared/components/error-loading/error-loading.component';


const routes: Routes = [
  {
    path: '',
    component: CouponsComponent
  },
  {
    path: 'New',
    component: NewCouponsComponent
  }
];
@NgModule({
  declarations: [
    CouponsComponent,
    NewCouponsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TranslocoModule,
    EmptyStateComponent,
    FormsModule,
    ReactiveFormsModule,
    TableComponent,
    UploadImageComponent,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ErrorLoadingComponent
  ]
})
export class CouponsModule { }
