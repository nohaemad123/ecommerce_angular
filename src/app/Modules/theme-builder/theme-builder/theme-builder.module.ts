import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeLayoutComponent } from './theme-layout/theme-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { ThemeSidebarComponent } from './theme-layout/theme-sidebar/theme-sidebar.component';
import { ThemePreviewComponent } from './theme-layout/theme-preview/theme-preview.component';
import { NavSettingComponent } from './theme-layout/nav-setting/nav-setting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeBuildCategoriesSliderComponent } from './theme-layout/components/theme-build-categories-slider/theme-build-categories-slider.component';
import { ThemeBuildBrandsSliderComponent } from './theme-layout/components/theme-build-brands-slider/theme-build-brands-slider.component';
import { ThemeBuildBigBannerComponent } from './theme-layout/components/theme-build-big-banner/theme-build-big-banner.component';
import { UploadImageComponent } from '@Shared/components/upload-image/upload-image.component';
import { ThemeBuildCarouselComponent } from './theme-layout/components/theme-build-carousel/theme-build-carousel.component';
import { ThemeBuildSiteFeaturesComponent } from './theme-layout/components/theme-build-site-features/theme-build-site-features.component';
import { ThemeBuildProductsComponent } from './theme-layout/components/theme-build-products/theme-build-products.component';
import { NgSelectModule } from '@ng-select/ng-select';


const routes: Routes = [
  {
    path: '',
    component: ThemeLayoutComponent
  }
];

@NgModule({
  declarations: [
    ThemeLayoutComponent,
    ThemeSidebarComponent,
    ThemePreviewComponent,
    NavSettingComponent,
    ThemeBuildCategoriesSliderComponent,
    ThemeBuildBrandsSliderComponent,
    ThemeBuildBigBannerComponent,
    ThemeBuildCarouselComponent,
    ThemeBuildSiteFeaturesComponent,
    ThemeBuildProductsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TranslocoModule,
    FormsModule,
    ReactiveFormsModule,
    UploadImageComponent,
    NgSelectModule
  ]
})
export class ThemeBuilderModule { }
