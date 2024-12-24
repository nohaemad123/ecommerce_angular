import { Component, DestroyRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandsService } from 'src/app/Data/services/brands.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CategoriesService } from 'src/app/Data/services/categories.service';
import { UnitsService } from 'src/app/Data/services/units.service';

@Component({
  selector: 'app-product-info-form',
  standalone: false,
  templateUrl: './product-info-form.component.html',
  styleUrls: ['./product-info-form.component.scss']
})
export class ProductInfoFormComponent implements OnInit, OnChanges {

  _fb = inject(FormBuilder);
  _brands = inject(BrandsService);
  _categories = inject(CategoriesService);
  _units = inject(UnitsService);
  _destroyRef = inject(DestroyRef);

  @Input() mode!: string;
  @Input() productData: any;
  @Output() nextEmitter = new EventEmitter();
  infoForm!: FormGroup;
  brandsList: any[] = [];
  categoriesList: any[] = [];
  unitsList: any[] = [];
  statusList: any = [
    { name: "Published", value: 1 },
    { name: "Inactive", value: 2 },
    // { name: "Draft", value: 2 },
    // { name: "Scheduled", value: 3 },
  ];
  selectedLang = "en";

  ngOnInit(): void {
    this.initInfoForm();
    this.getAllBrands();
    this.getAllCategories();
    this.getAllUnits();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.productData = changes['productData'].currentValue ? changes['productData'].currentValue : this.productData;
    this.infoForm?.patchValue(this.productData);
  }

  initInfoForm(): void {
    this.infoForm = this._fb.group({
      productNameEn: ["", [Validators.required, Validators.maxLength(300)]],
      productName: ["", [Validators.required, Validators.maxLength(300)]],
      // descriptionEn: ["", [Validators.required, Validators.maxLength(2000)]],
      descriptionEn: [""],
      description: [""],
      productShortDescriptionEn: [""],
      productShortDescription: [""],
      label: [""],
      labelEn: [""],
      brandID: [null, [Validators.required]],
      categories: [[], [Validators.required]],
      productQuantity: [null, [Validators.required]],
      minimumQuantity: [null],
      maximumQuantity: [null],
      codeProduct: [""],
      status: [null, [Validators.required]],
      width: [0],
      widthId: [null],
      length: [0],
      lengthId: [null],
      height: [0],
      heightId: [null],
      weight: [0],
      weightId: [null],
      costProduct: [null],
      productPrice: [null, [Validators.required]],
      priceAfterDiscount: [null],
      discountStartDate: [null],
      discountEndDate: [null],
     
      tags: [[]],
    });
    // if (this.mode == 'EDIT') 
    this.infoForm?.patchValue(this.productData);
  }

  getAllBrands(): void {
    this._brands.getAllBrands({
      page: 1,
      limit: 1000
    }).pipe(
      takeUntilDestroyed(this._destroyRef),
    ).subscribe((response: any) => {
      this.brandsList = response.items;
    })
  }

  getAllUnits(): void {
    this._units.getAllUnits().pipe(
      takeUntilDestroyed(this._destroyRef),
    ).subscribe((response: any) => {
      this.unitsList = response;
    })
  }

  getUnitsByType(type: string): any {
    return this.unitsList.filter((unit: any) => unit.type == type)
  }

  getAllCategories(): void {
    this._categories.getCategoriesTreeList().pipe(
      takeUntilDestroyed(this._destroyRef),
    ).subscribe((response: any) => {
      this.categoriesList = response;
    })
  }

  compareFn(t1: any, t2: any): boolean {
    return t1.value === t2;
  }

  onNext(): void {
    // console.log(this.infoForm)
    this.nextEmitter.emit(this.infoForm.value);
  }

}
