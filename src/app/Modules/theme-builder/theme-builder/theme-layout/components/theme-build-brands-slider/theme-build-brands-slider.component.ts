import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeBuilderService } from 'src/app/Data/services/themebuilder.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { ToastrService } from 'ngx-toastr';
import { FilterCriteria } from 'src/app/Data/models/table/table';
import { BrandsService } from 'src/app/Data/services/brands.service';
import { HSOverlay, HSSelect } from 'preline';

@Component({
  selector: 'app-theme-build-brands-slider',
  standalone: false,
  templateUrl: './theme-build-brands-slider.component.html',
  styleUrls: ['./theme-build-brands-slider.component.scss']
})
export class ThemeBuildBrandsSliderComponent {

  _fb = inject(FormBuilder)
  _themeBuilderService = inject(ThemeBuilderService);
  _brands = inject(BrandsService);
  _toastrService = inject(ToastrService);
  _translocoService = inject(TranslocoService);
  filterCriteria: FilterCriteria = {
    page: 1,
    limit: 999,
    name: '',
    status: null
  }
  brandSliderForm!: FormGroup;
  AllBrands: any;
  sectionSelected: any;
  submitLoading = false;

  constructor() {
    this.brandSliderForm = this._fb.group({
      title: ['', [Validators.required]],
      titleEn: ['', [Validators.required]],
      sectionTypeTopBrands: [[], [Validators.required]]
    })
  }


  ngOnInit(): void {
    // console.log(this._themeBuilderService.currentSectionSelected$.value,"category CMP");
    this._themeBuilderService.currentSectionSelected$.subscribe(res => {
      this.sectionSelected = res;
      this.brandSliderForm.patchValue({
        title: this.sectionSelected?.title,
        titleEn: this.sectionSelected?.titleEn,
      })
    })
    this.getAllBrands()
  }

  getAllBrands() {
    this._brands.getAllBrands(this.filterCriteria).subscribe((res: any) => {
      this.AllBrands = res.items;
      setTimeout(() => {
        window.HSStaticMethods.autoInit();
      }, 100);
      this.sectionSelected?.id ? this.getPageSectionDetails() : '';
    });
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  getPageSectionDetails() {
    this._themeBuilderService.getPageSectionDetails(this._themeBuilderService.currentSectionSelected$.value.id).subscribe(res => {
      this.brandSliderForm.controls['sectionTypeTopBrands'].patchValue(res?.map((item: any) => {
        return {
          id: item.brandId,
          name: item.brandName
        }
      }));
    })
  }

  onSubmitSection() {
    const BRANDS_SECTION_DATA = {
      sectionId: this.sectionSelected.id,
      sectionTypeId: this.sectionSelected.sectionTypeId,
      sectionTypeTopBrands:  this.brandSliderForm.value.sectionTypeTopBrands.map((item: any) => {
        return {
          id: item.id,
          title: "",
          titleEn: ""
        }
      })
    };
    this.submitLoading = true;
    this._themeBuilderService
      .updateSectionTypeBrands(BRANDS_SECTION_DATA)
      .subscribe((res: any) => {
        const TITLE_BODY = {
          sectionId: this.sectionSelected.id,
          title: this.brandSliderForm.value.title,
          titleEn: this.brandSliderForm.value.titleEn
        };
        this.updateTitle(TITLE_BODY);
      }, err => {
        this.submitLoading = false;
      })

  }

  updateTitle(body: any) {
    this._themeBuilderService.updateSectionTitle(body).subscribe((res) => {

      this._themeBuilderService.updateSectionData$.next(true)

      HSOverlay.close(document.querySelector('#section-edit') as HTMLElement)
      HSOverlay.close(document.querySelector('#section-Add') as HTMLElement)

      this.submitLoading = false;
      this._toastrService.success(
        this._translocoService.translate('themeBuilder.component_category_slider.section_brand_updated'),
        this._translocoService.translate('success'),
        { toastClass: 'toast ngx-toastr', closeButton: true }
      )
    }, err => {
      this.submitLoading = false;
    });
  }

}
