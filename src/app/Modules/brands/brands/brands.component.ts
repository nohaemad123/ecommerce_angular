import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { EmptyState } from 'src/app/Data/models/empty-state/empty-state';
import { TranslocoService } from '@ngneat/transloco';
import { FormControl} from '@angular/forms';
import { BrandsService } from 'src/app/Data/services/brands.service';
import { FilterCriteria, IColumnType, Page, TABLE_ACTIONS } from 'src/app/Data/models/table/table';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, catchError, debounceTime, filter } from 'rxjs';

@Component({
  selector: 'app-brands',
  standalone: false,
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  _brands = inject(BrandsService);
  _translationService = inject(TranslocoService)
  _toastrService = inject(ToastrService);
  _translocoService = inject(TranslocoService);
  _destroyRef = inject(DestroyRef);

  emptyStateData!: EmptyState;
  filterCriteria: FilterCriteria = {
    page: 1,
    limit: 10,
    name: '',
    status: null
  }
  columns: IColumnType[] = [];
  searchControl = new FormControl();
  brandsError: boolean = false;
  brands$ = this._brands.getAllBrands(this.filterCriteria).pipe(
    catchError(() => { this.brandsError = true; return EMPTY })
  )
error_msg="brands.brands_error_loading"

  ngOnInit(): void {
    this.prepareEmptyStateData();
    this.handleColumns();
    this.handleBrandsSearch();
  }

  handleColumns(): void {
    this.columns = [
      { title: "brands.table.thead.code", type: 'index', data: { prop: 'id' } },
      { title: "brands.table.thead.name", type: 'avatar', data: { prop: 'name', src: "imgBrand", description: 'name' }, width: 280 },
      { title: "brands.table.thead.status", type: 'status', data: { prop: 'status' } },
      { title: "brands.table.thead.actions", type: 'actions', data: [{ id: "id", name: 'edit', url: '/Products/Brand/New' }, { id: "id", name: 'delete' }], width: 280, },
    ];
  }

  prepareEmptyStateData(): void {
    this.emptyStateData = {
      title: 'no_brands.title',
      description: 'no_brands.description',
      withBtn: true,
      image: "assets/images/no_brands.svg",
      btnText: 'no_brands.btnText',
      linkButton: "/Brand/New"
    }
  }

  handleBrandsSearch(){
    this.searchControl.valueChanges
    .pipe(
      filter((q) => q?.trim()?.length >= 1 || q?.trim() == ''),
      debounceTime(500),
    ).subscribe((searchQuery: string) => {
      this.filterCriteria.name = searchQuery;
      this.filterCriteria.page = 1;
      this.brands$ = this._brands.getAllBrands(this.filterCriteria)
    })
  }

  setPage(page: Page): void {
    this.filterCriteria.page = page.offset + 1;
    this.brands$ = this._brands.getAllBrands(this.filterCriteria)
  }

  setLimit(limit: number): void {
    this.filterCriteria.limit = limit;
    this.brands$ = this._brands.getAllBrands(this.filterCriteria)
  }

  actionClicked(event: any): void {
    switch (event.action) {
      case TABLE_ACTIONS.DELETE:
        this.deleteBrand(event.id);
        break;
    }
  }

  deleteBrand(id: number): void {
    this._brands
      .deleteBrand(id)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe({
        next: (response: any) => {
          if (response) {
            this._toastrService.success(
              this._translocoService.translate('brands.delete_brand.title'),
              '',
              { toastClass: 'toast ngx-toastr', closeButton: true }
            )
            this.brands$ = this._brands.getAllBrands(this.filterCriteria)
          }
        }
      })
  }

}
