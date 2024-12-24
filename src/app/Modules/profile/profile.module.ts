import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { ProfileComponent } from './profile/profile.component';
import { ProfileLocationComponent } from './profile-location/profile-location.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadImageComponent } from '@Shared/components/upload-image/upload-image.component';
import { NgSelectModule } from '@ng-select/ng-select';


const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  },

];

@NgModule({
  declarations: [
    ProfileComponent, ProfileLocationComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TranslocoModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    UploadImageComponent,
    NgSelectModule
  ]
})
export class ProfileModule { }