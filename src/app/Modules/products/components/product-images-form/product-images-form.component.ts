import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ENDPOINT } from 'src/app/Data/services/endpoint/endpoint';

@Component({
  selector: 'app-product-images-form',
  standalone: false,
  templateUrl: './product-images-form.component.html',
  styleUrls: ['./product-images-form.component.scss']
})
export class ProductImagesFormComponent implements OnInit, OnChanges {

  @Input() mode!: string;
  @Input() productData: any;
  @Output() nextEmitter = new EventEmitter();
  @Output() previousEmitter = new EventEmitter();
  mainIMG: string | null | undefined;
  productIMGs: string | null | undefined | [];
  FOLDERNAME = ENDPOINT.GENERAL.FOLDER_NAME.PRODUCTS;
  productImages: any[] = [];
  mainImage: any[] = [];

  ngOnInit(): void {
    if(this.mode === 'EDIT'){
      this.mainIMG = this.productData.productImages?.find((img: any) => img.isMainImage)?.imageProduct;
      console.log(this.mainIMG);
      this.productIMGs = this.productData.productImages?.filter((img: any) => !img.isMainImage).map((img: any) => img.imageProduct);
      console.log(this.productIMGs);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.productData = changes['productData'].currentValue ? changes['productData'].currentValue : this.productData;
  }

  onUploadIMG(imgURL: string) {
    this.productImages.push({
      imageProduct: imgURL,
      isMainImage: false
    })
  }

  onUploadMainIMG(imgURL: string) {
    this.mainImage.push(imgURL);
    this.productImages.push({
      imageProduct: imgURL,
      isMainImage: true
    })
  }

  onNext(): void {
    this.nextEmitter.emit({
      productImages: this.productImages
    });
  }

  onPervious(): void {
    this.previousEmitter.emit();
  }

}
