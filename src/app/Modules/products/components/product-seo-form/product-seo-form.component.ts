import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ENDPOINT } from 'src/app/Data/services/endpoint/endpoint';

@Component({
  selector: 'app-product-seo-form',
  standalone: false,
  templateUrl: './product-seo-form.component.html',
  styleUrls: ['./product-seo-form.component.scss']
})
export class ProductSeoFormComponent implements OnInit, OnChanges {

  @Input() mode!: string;
  @Input() productData: any;
  @Output() finishEmitter = new EventEmitter();
  @Output() previousEmitter = new EventEmitter();
  selectedLang = "en";
  _fb = inject(FormBuilder);
  seoForm!: FormGroup;
  updatedIMG: string | null | undefined;
  FOLDERNAME = ENDPOINT.GENERAL.FOLDER_NAME.PRODUCTS;
  seoImage: any[] = [];

  ngOnInit(): void {
    this.initSeoForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.productData = changes['productData'].currentValue ? changes['productData'].currentValue : this.productData;
  }

  initSeoForm(): void {
    this.seoForm = this._fb.group({
      productPageTitle: [""],
      productPageTitleEn: [""],
      productPageDescription: [""],
      productPageDescriptionEn: [""],
      productPageUrl: [""],
      seoKeywords: [""],
      seoKeywordsEn: [""],
      seoImage: [""],
    });
    if (this.mode == 'EDIT') this.seoForm.patchValue(this.productData);
  }

  onUploadIMG(imgURL: string) {
    this.seoImage.push({
      imageProduct: imgURL
    });
    this.seoForm.patchValue({
      seoImage: imgURL
    })
  }

  onNext(): void {
    this.finishEmitter.emit(this.seoForm.value);
  }

  onPervious(): void {
    this.previousEmitter.emit();
  }

}
