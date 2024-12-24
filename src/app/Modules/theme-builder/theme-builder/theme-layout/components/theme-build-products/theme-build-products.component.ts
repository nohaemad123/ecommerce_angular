import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemeBuilderService } from 'src/app/Data/services/themebuilder.service';
import { TranslocoService } from '@ngneat/transloco';
import { ToastrService } from 'ngx-toastr';
import { HSOverlay } from 'preline';
import { ProductsService } from 'src/app/Data/services/products.service';

@Component({
  selector: 'app-theme-build-products',
  standalone: false,
  templateUrl: './theme-build-products.component.html',
  styleUrls: ['./theme-build-products.component.scss']
})
export class ThemeBuildProductsComponent implements OnInit {

  _fb = inject(FormBuilder)
  _themeBuilderService = inject(ThemeBuilderService);
  _toastrService = inject(ToastrService);
  _translocoService = inject(TranslocoService);
  _products = inject(ProductsService);

  productsSectionForm!: FormGroup;
  sectionSelected: any;
  sectionProducts: any;
  filterCriteria = {
    page: 1,
    limit: 1000,
    status: 1,
    name: ''
  };
  allProducts: any;
  submitLoading = false;

  ngOnInit(): void {
    this.initProductsSectionForm();
    this.getAllProducts();
    this._themeBuilderService.currentSectionSelected$.subscribe(res => {
      this.sectionSelected = res;
      this.productsSectionForm.patchValue({
        title: this.sectionSelected?.title,
        titleEn: this.sectionSelected?.titleEn
      })
    })
  }

  initProductsSectionForm(): void {
    this.productsSectionForm = this._fb.group({
      title: ['', [Validators.required]],
      titleEn: ['', [Validators.required]],
      sectionTypeProducts: [[], [Validators.required]]
    })
  }

  getAllProducts(): void {
    this._products.getAllProducts(this.filterCriteria, {}).subscribe((res: any) => {
      this.allProducts = res.items;
      setTimeout(() => {
        window.HSStaticMethods.autoInit();
      }, 100);
      this.sectionSelected?.id ? this.getPageSectionDetails() : '';
    });
  }

  getPageSectionDetails() {
    this._themeBuilderService.getPageSectionDetails(this._themeBuilderService.currentSectionSelected$.value.id).subscribe(res => {
      this.productsSectionForm.controls['sectionTypeProducts'].patchValue(res?.map((item: any) => {
        return {
          id: item.productId,
          productName: item.productName
        }
      }));
    })
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  onSubmitSection(): void {
    const PRODUCTS_SECTION_DATA = {
      sectionId: this.sectionSelected.id,
      sectionTypeId: this.sectionSelected.sectionTypeId,
      sectionTypeProducts: this.productsSectionForm.value.sectionTypeProducts.map((item: any) => {
        return {
          id: item.id,
          title: "",
          titleEn: ""
        }
      })
    }
    this.submitLoading = true;
    this._themeBuilderService.UpdateSectionTypeProducts(PRODUCTS_SECTION_DATA)
      .subscribe((res: any) => {
        const TITLE_BODY = {
          sectionId: this.sectionSelected.id,
          title: this.productsSectionForm.value.title,
          titleEn: this.productsSectionForm.value.titleEn
        }
        this.updateTitle(TITLE_BODY);
      }, err => {
        this.submitLoading = false;
      });
  }

  updateTitle(body: any) {
    this._themeBuilderService.updateSectionTitle(body).subscribe((res) => {

      this._themeBuilderService.updateSectionData$.next(true)

      HSOverlay.close(document.querySelector('#section-edit') as HTMLElement)
      HSOverlay.close(document.querySelector('#section-Add') as HTMLElement)
      this.submitLoading = false;

      this._toastrService.success(
        this._translocoService.translate('themeBuilder.component_category_slider.section_products_updated'),
        this._translocoService.translate('success'),
        { toastClass: 'toast ngx-toastr', closeButton: true }
      )
    }, (err) => {
      this.submitLoading = false;
    });
  }


}
