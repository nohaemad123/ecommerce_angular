import { Component, Inject, InjectionToken, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Value } from '../../nav-setting/nav-setting.component';
import { ThemeBuilderService } from 'src/app/Data/services/themebuilder.service';
import { CategoriesService } from 'src/app/Data/services/categories.service';
import { FilterCriteria, Page } from 'src/app/Data/models/table/table';
import { HSOverlay, HSSelect } from 'preline/preline';
import { ToastrService } from 'ngx-toastr';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-theme-build-categories-slider',
  standalone: false,
  templateUrl: './theme-build-categories-slider.component.html',
  styleUrls: ['./theme-build-categories-slider.component.scss']
})
export class ThemeBuildCategoriesSliderComponent {

  _fb = inject(FormBuilder)
  _themeBuilderService = inject(ThemeBuilderService);
  _categoriesService = inject(CategoriesService);
  _toastrService = inject(ToastrService);
  _translocoService = inject(TranslocoService);
  filterCriteria: FilterCriteria = {
    page: 1,
    limit: 999,
    name: '',
    status: null
  }
  categorySliderForm!: FormGroup;
  AllCategories: any;
  sectionSelected: any;
  submitLoading = false;

  constructor() {
    this.categorySliderForm = this._fb.group({
      title: ['', [Validators.required]],
      titleEn: ['', [Validators.required]],
      sectionTypeTopCategories: [[], [Validators.required]]
    })
  }

  ngOnInit(): void {
    this._themeBuilderService.currentSectionSelected$.subscribe(res => {
      this.sectionSelected = res;
      this.categorySliderForm.patchValue({
        title: this.sectionSelected?.title,
        titleEn: this.sectionSelected?.titleEn,
      })
    })
    this.getAllCategories();
  }


  getPageSectionDetails() {
    this._themeBuilderService.getPageSectionDetails(this._themeBuilderService.currentSectionSelected$.value.id).subscribe(res => {
      this.categorySliderForm.controls['sectionTypeTopCategories'].patchValue(res?.map((item: any) => {
        return {
          id: item.categoryId,
          name: item.categoryName
        }
      }));
    })
  }

  getAllCategories() {
    this._categoriesService.getAllCategories(this.filterCriteria).subscribe((res: any) => {
      this.AllCategories = res.items;
      setTimeout(() => {
        window.HSStaticMethods.autoInit();
      }, 100);
      this.sectionSelected?.id ? this.getPageSectionDetails() : '';
    });
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }


  // onSubmitSection() {
  //   this.sectionSelected?.id ? this.updateSection() : this.addSection()
  // }

  // addSection() {
  //   // addSectionTypeTopCategory

  //   const el = HSSelect.getInstance('#select') as any;


  //   if (el.value.length === 0) {
  //     this._toastrService.warning(
  //       this._translocoService.translate('themeBuilder.component_category_slider.required_category'),
  //       this._translocoService.translate('warning'),
  //       { toastClass: 'toast ngx-toastr', closeButton: true }
  //     )
  //     // return;
  //   }

  //   el.value.forEach((categoryID: any) => {
  //     let section = {
  //       id: 0,
  //       title: "",
  //       titleEn: "",
  //       sectionId: this.sectionSelected.id,
  //       sectionTypeId: this.sectionSelected.sectionTypeId,
  //       categoryId: categoryID,
  //     };
  //     this._themeBuilderService
  //       .addSectionTypeTopCategory(section)
  //       .subscribe((res) => {
  //         console.log(res);
  //         //  this._coreTranslationService.instant("Catogroy_Added"),
  //         //  this._coreTranslationService.instant("Success"),

  //       })
  //     let body = {
  //       "sectionId": this.sectionSelected.id,
  //       title: this.categorySliderForm.value.title,
  //       titleEn: this.categorySliderForm.value.titleEn
  //     };
  //     this.updateTitle(body);
  //     //  mappingSectionTypeTopCategories.push(section);
  //   });

  // }

  // updateSection() {
  //   console.log(this.categorySliderForm.value);

  //   const el = HSSelect.getInstance('#select') as any;

  //   let mappingSectionTypeTopCategories: any = [];

  //   el.value.forEach((id: any) => {
  //     let section = {
  //       id: id,
  //       title: this.categorySliderForm.value.title,
  //       titleEn: this.categorySliderForm.value.titleEn
  //     };
  //     mappingSectionTypeTopCategories.push(section);
  //   });
  //   if (el.value.length === 0) {
  //     this._toastrService.warning(
  //       this._translocoService.translate('theme_builder.component_category_slider.required_category'),
  //       this._translocoService.translate('warning'),
  //       { toastClass: 'toast ngx-toastr', closeButton: true }
  //     )
  //     return;
  //   }
  //   // console.log(mappingSectionTypeTopCategories);
  //   let body = {
  //     "sectionTypeTopCategories": mappingSectionTypeTopCategories,
  //     "sectionId": this.sectionSelected.id,
  //     "sectionTypeId": this.sectionSelected.sectionTypeId,
  //   }
  //   this._themeBuilderService
  //     .updateSectionTypeTopCategory(body)
  //     .subscribe((res) => {
  //       console.log(res);
  //       let body = {
  //         "sectionId": this.sectionSelected.id,
  //         title: this.categorySliderForm.value.title,
  //         titleEn: this.categorySliderForm.value.titleEn
  //       };
  //       this.updateTitle(body);
  //     })
  // }

  onSubmitSection() {
    const CATEGORIES_SECTION_DATA = {
      sectionId: this.sectionSelected.id,
      sectionTypeId: this.sectionSelected.sectionTypeId,
      sectionTypeTopCategories:  this.categorySliderForm.value.sectionTypeTopCategories.map((item: any) => {
        return {
          id: item.id,
          title: "",
          titleEn: ""
        }
      })
    };
    this.submitLoading = true;
    this._themeBuilderService
      .updateSectionTypeTopCategory(CATEGORIES_SECTION_DATA)
      .subscribe((res: any) => {
        const TITLE_BODY = {
          sectionId: this.sectionSelected.id,
          title: this.categorySliderForm.value.title,
          titleEn: this.categorySliderForm.value.titleEn
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
      this._toastrService.success(
        this._translocoService.translate('themeBuilder.component_category_slider.section_category_updated'),
        this._translocoService.translate('success'),
        { toastClass: 'toast ngx-toastr', closeButton: true }
      )
    });
  }


}
