import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoService } from '@ngneat/transloco';
import { ProductsService } from 'src/app/Data/services/products.service';
import { EmptyState } from 'src/app/Data/models/empty-state/empty-state';
import { FilterCriteria, IColumnType, Page, TABLE_ACTIONS } from 'src/app/Data/models/table/table';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { debounceTime, filter } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  _products = inject(ProductsService);
  _translationService = inject(TranslocoService)
  _destroyRef = inject(DestroyRef);
  _toastrService = inject(ToastrService);

  emptyStateData!: EmptyState;
  filterCriteria: FilterCriteria = {
    page: 1,
    limit: 10,
    name: '',
    status: null
  };
  searchControl = new FormControl();
  columns: IColumnType[] = [];

  products$ = this._products.getAllProducts(this.filterCriteria, {});

  ngOnInit(): void {
    this.prepareEmptyStateData();
    this.handleColumns();
    this.handleProductsSearch();
  }

  handleColumns(): void {
    this.columns = [
      { title: "products.TABLE.CODE", type: 'text', data: { prop: 'id' } },
      { title: "products.TABLE.NAME", type: 'avatar', data: { prop: 'productName', src: "mainImage", description: 'productName' }, width: 280 },
      // { title: "products.TABLE.CATEGORY", type: 'text', data: { prop: 'category.name' } },
      { title: "products.TABLE.QUANTITY", type: 'text', data: { prop: 'productQuantity' } },
      { title: "products.TABLE.PRICE", type: 'text', data: { prop: 'productPrice' } },
      { title: "products.TABLE.STATUS", type: 'status', data: { prop: 'status' } },
      { title: "products.TABLE.ACTIONS", type: 'actions', data: [{ id: "id", name: 'edit', url: '/Products/List/New' }, { id: "id", name: 'delete' }], width: 280, },
    ];
  }

  prepareEmptyStateData(): void {
    this.emptyStateData = {
      title: 'Products.EMPTY.HEADER',
      description: 'Products.EMPTY.SUB_HEADER',
      withBtn: false,
      image: "assets/images/no_brands.svg",
      btnText: 'Products.EMPTY.ADD_PRODUCT',
      linkButton: "/Products/New"
    }
  }

  handleProductsSearch(): void {
    this.searchControl.valueChanges
      .pipe(
        filter((q) => q?.trim()?.length >= 2 || q?.trim() == ''),
        debounceTime(500)
      ).subscribe((searchQuery: string) => {
        this.filterCriteria.name = searchQuery;
        this.filterCriteria.page = 1;
        this.products$ = this._products.getAllProducts(this.filterCriteria, {});
      })
  }

  setPage(page: Page): void {
    this.filterCriteria.page = page.offset + 1;
    this.products$ = this._products.getAllProducts(this.filterCriteria, {});
  }

  setLimit(limit: number): void {
    this.filterCriteria.limit = limit;
    this.products$ = this._products.getAllProducts(this.filterCriteria, {});
  }

  actionClicked(event: any): void {
    switch (event.action) {
      case TABLE_ACTIONS.DELETE:
        this.deleteProduct(event.id);
        break;
    }
  }

  deleteProduct(id: number): void {
    this._products
      .deleteProduct(id)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe({
        next: (response: any) => {
          if (response) {
            this._toastrService.success(
              this._translationService.translate('products.delete_success'),
              '',
              { toastClass: 'toast ngx-toastr', closeButton: true }
            )
            this.products$ = this._products.getAllProducts(this.filterCriteria, {});
          }
        }
      })
  }

}
