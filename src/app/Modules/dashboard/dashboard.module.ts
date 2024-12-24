import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UploadImageComponent } from '@Shared/components/upload-image/upload-image.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TranslocoModule,
    CarouselModule,
    NgxDatatableModule,
    UploadImageComponent

  ]
})
export class DashboardModule { }
