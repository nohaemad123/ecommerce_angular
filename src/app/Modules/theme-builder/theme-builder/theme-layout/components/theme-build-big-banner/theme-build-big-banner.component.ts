import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemeBuilderService } from 'src/app/Data/services/themebuilder.service';
import { TranslocoService } from '@ngneat/transloco';
import { ToastrService } from 'ngx-toastr';
import { HSOverlay } from 'preline';

@Component({
  selector: 'app-theme-build-big-banner',
  standalone: false,
  templateUrl: './theme-build-big-banner.component.html',
  styleUrls: ['./theme-build-big-banner.component.scss']
})
export class ThemeBuildBigBannerComponent {

  _fb = inject(FormBuilder)
  _themeBuilderService = inject(ThemeBuilderService);
  _toastrService = inject(ToastrService);
  _translocoService = inject(TranslocoService);
  bigBannerForm!:FormGroup;
  FOLDERNAME = "themeBuildBigBanner"
  sectionSelected:any;

  constructor(){
    this.bigBannerForm = this._fb.group({
      title: ['', [Validators.required]],
      titleEn: ['', [Validators.required]],
      img: ['', [Validators.required]],
      link: [''],
    })
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._themeBuilderService.currentSectionSelected$.subscribe(res => {
      this.sectionSelected = res;
      this.bigBannerForm.patchValue({
        title: this.sectionSelected?.title,
        titleEn: this.sectionSelected?.titleEn,
      })
    })
    setTimeout(() => {
      window.HSStaticMethods.autoInit();
    }, 100);
  }

  onUploadIMG(imgURL: string) {
    this.bigBannerForm.patchValue({ img: imgURL })
  }

  onSubmitSection(){
   let banners = {banners:[
      {
        "id": 0,
        "sectionId": this.sectionSelected.id,
        "sectionTypeId": this.sectionSelected.sectionTypeId,
        "img":  this.bigBannerForm.value.img,
        "link":  this.bigBannerForm.value.link,
        "title":  this.bigBannerForm.value.title,
        "titleEn":  this.bigBannerForm.value.titleEn
      }
    ],
    "sectionId": this.sectionSelected.id,
    "sectionTypeId": this.sectionSelected.sectionTypeId
  }
    console.log(this.bigBannerForm.value);
    // this.items.forEach(element => {

    this._themeBuilderService.UpdateSectionTypeBigBanners(banners)
    .subscribe((res: any) => {
      HSOverlay.close(document.querySelector('#section-edit') as HTMLElement)
      HSOverlay.close(document.querySelector('#section-Add') as HTMLElement)
      this._themeBuilderService.updateSectionData$.next(true)

      this._translocoService.translate('themeBuilder.component_category_slider.section_big_banner_updated'),
      this._translocoService.translate('success')
      // this._themeBuilderService.refreshSite(this.pageDetailsSection.pageUrl);
    })
  }


}
