import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, SimpleChanges, inject } from '@angular/core';
import { BrandsService } from 'src/app/Data/services/brands.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ENDPOINT } from 'src/app/Data/services/endpoint/endpoint';
import { ToastrService } from 'ngx-toastr';
import { TranslocoService } from '@ngneat/transloco';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-new-brand',
  standalone: false,
  templateUrl: './new-brand.component.html',
  styleUrls: ['./new-brand.component.scss']
})
export class NewBrandComponent implements OnInit {
  isChecked: boolean = false;

  // injectable
  _fb = inject(FormBuilder);
  _brandService = inject(BrandsService);
  _route = inject(ActivatedRoute);
  _toastrService = inject(ToastrService);
  _translocoService = inject(TranslocoService);
  _router = inject(Router);

  // private variables
  newBrandForm!: FormGroup;
  openTab = 1;
  submitLoading = false;
  brandID: number;
  updatedIMG: string | null | undefined;
  FOLDERNAME = ENDPOINT.GENERAL.FOLDER_NAME.CATEGORY
  statusChecked: boolean = true;


  constructor() {
    this.newBrandForm = this._fb.group({
      name: ["", [Validators.required]],
      nameEn: ["", [Validators.required]],
      description: [""],
      descriptionEn: [""],
      imgBrand: ["", [Validators.required]],
      status: [1]
    });
    this.brandID = this._route.snapshot.queryParams['id'];
  }

  ngOnInit(): void {
    this.brandID ? this.getBrandByID() : ''
  }


  toggleTabs($tabNumber: number) {
    this.openTab = $tabNumber;
  }

  getBrandByID() {
    this._brandService
      .getBrandById(this.brandID)
      .subscribe((response: any) => {
        if (response) {
          this.newBrandForm.patchValue({
            name: response.name,
            nameEn: response.nameEn,
            description: response.description,
            descriptionEn: response.descriptionEn,
            imgBrand: response.imgBrand,
            status: response.status,
          })
        }
        this.updatedIMG = response.imgBrand;
        if (response.status == 1) {
          this.statusChecked = true
        } else {
          this.statusChecked = false
        }
      })
  }

  onUploadIMG(imgURL: string) {
    this.newBrandForm.patchValue({ imgBrand: imgURL })
  }

  onSubmitNewBrand() {

    if (this.brandID) {
      this.editBrand()
    } else {
      this.addBrand();
    }
  }

  toggleCheck(event: any) {
    if (event.target.checked) {
      this.statusChecked = true
    } else {
      this.statusChecked = false
    }

    console.log(this.statusChecked)
  }

  addBrand() {

    if (this.newBrandForm.invalid) {
      return;
    }

    this.submitLoading = true;

    if (this.statusChecked) {
      this.newBrandForm.controls['status'].setValue(1)
    } else {
      this.newBrandForm.controls['status'].setValue(2)
    }

    this._brandService
      .addBrand(this.newBrandForm.value)
      .pipe(finalize(() => this.submitLoading = false))
      .subscribe((response: any) => {
        this.submitLoading = false;

        this._toastrService.success(
          this._translocoService.translate('brands.add_brand.title'),
          this._translocoService.translate('brands.add_brand.subtitle'),
          { toastClass: 'toast ngx-toastr', closeButton: true }
        )
        this._router.navigate(['/Products/Brand']);

      })

  }

  editBrand() {

    if (this.newBrandForm.invalid) {
      return;
    }

    this.submitLoading = true;
    if (this.statusChecked) {
      this.newBrandForm.controls['status'].setValue(1)
    } else {
      this.newBrandForm.controls['status'].setValue(2)
    }

    this._brandService
      .updateBrand(this.newBrandForm.value, this.brandID)
      .pipe(finalize(() => this.submitLoading = false))
      .subscribe((response: any) => {
        this.submitLoading = false;
        this._toastrService.success(
          this._translocoService.translate('brands.edit_brand.title'),
          this._translocoService.translate('brands.edit_brand.subtitle'),
          { toastClass: 'toast ngx-toastr', closeButton: true }
        )
        this._router.navigate(['/Products/Brand']);

      })

  }
}
