import { Component, DestroyRef, ElementRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/Data/services/products.service';
import { TranslocoService } from '@ngneat/transloco';
import { ToastrService } from 'ngx-toastr';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-new-product',
  standalone: false,
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {

  _route = inject(ActivatedRoute);
  _products = inject(ProductsService);
  _translocoService = inject(TranslocoService)
  _destroyRef = inject(DestroyRef);
  _toastrService = inject(ToastrService);
  _router = inject(Router);

  productData: any = {};
  productInfoData: any = {};
  productImagesData: any = {};
  productSeoData: any = {};
  productID!: number;
  currentStepIndex = 1;
  mode: 'ADD' | 'EDIT' = 'ADD';
  loading = false;

  constructor(
    private elRef: ElementRef
  ) {
    this.productID = this._route.snapshot.queryParams['id'];

    console.log(this.productID);
  }

  ngOnInit(): void {
    this.productID ? this.getProductByID() : '';
    this.mode = this.productID ? 'EDIT' : 'ADD';
  }

  getProductByID(): void {
    this._products
      .getProductById(this.productID)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe((response: any) => {
        if (response) {
          this.productData = response;
        }
      })
  }

  onStepNext(formData: any): void {
    console.log(this.productData);
    this.productData = {
      ...this.productData,
      ...formData
    }
    this.currentStepIndex++;
    console.log(this.currentStepIndex);

    this.scrollToTop();
  }

  onStepPrevious(event: any): void {
    this.currentStepIndex--;
    this.scrollToTop();
  }

  scrollToTop(): void {
    // Using native JavaScript to scroll to the top
    const scrollToTop = this.elRef.nativeElement.querySelector('#stepper');
    scrollToTop.scrollTop = 0;
  }

  onFinish(formData: any): void {
    this.productData = {
      ...this.productData,
      ...formData
    }
    if (this.mode === 'ADD') {
      this.onAddProduct();
    } else if (this.mode === 'EDIT') {
      this.onEditProduct();
    }
  }

  prepareProductData(): any {
    return {
      ...this.productData,
      additionalInformation: []
    }
  }

  onAddProduct(): void {
    this.loading = true;
    this._products.addProduct(this.prepareProductData()).pipe(
      takeUntilDestroyed(this._destroyRef),
    ).subscribe((response: any) => {
      if (response) {
        this._toastrService.success(
          this._translocoService.translate('products.add_product.title'),
          this._translocoService.translate('products.add_product.subtitle'),
          { toastClass: 'toast ngx-toastr', closeButton: true }
        )
        this._router.navigate(['/Products']);
        this.loading = false;
      }
    }, (error: any) => {
      this.loading = false;
    })
  }

  onEditProduct(): void {
    this.loading = true;
    this._products.updateProduct(this.productID, this.prepareProductData()).pipe(
      takeUntilDestroyed(this._destroyRef),
    ).subscribe((response: any) => {
      if (response) {
        this._toastrService.success(
          this._translocoService.translate('products.edit_product.title'),
          this._translocoService.translate('products.edit_product.subtitle'),
          { toastClass: 'toast ngx-toastr', closeButton: true }
        )
        this._router.navigate(['/Products']);
        this.loading = false;
      }
    }, (error: any) => {
      this.loading = false;
    })
  }

}
