import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsWebComponent } from './settings-web/settings-web.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { UploadImageComponent } from '@Shared/components/upload-image/upload-image.component';


const routes: Routes = [
  {
    path: '',
    component: SettingsWebComponent
  }
];

@NgModule({
  declarations: [
    SettingsWebComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TranslocoModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    UploadImageComponent
  ]
})
export class SettingsModule { }
