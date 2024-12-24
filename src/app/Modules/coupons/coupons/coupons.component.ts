import { IColumnType, TABLE_ACTIONS } from 'src/app/Data/models/table/table';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, catchError } from 'rxjs';
import { EmptyState } from 'src/app/Data/models/empty-state/empty-state';
import { CouponsService } from 'src/app/Data/services/coupons.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-coupons',
  standalone: false,
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent implements OnInit {
  _coupons = inject(CouponsService);
  _toastrService = inject(ToastrService);
  _translocoService = inject(TranslocoService);
  _destroyRef = inject(DestroyRef);

  emptyStateData!: EmptyState;
  filterCriteria = {
    page: 1,
    limit: 10,
    name: '',
    status: null
  }
  columns: IColumnType[] = [];
  showError: boolean = false;

  coupons$ = this._coupons
    .getAllCoupons(this.filterCriteria)
    .pipe(catchError((error) => {
      this.showError = true;
      return EMPTY; // or any other fallback value
    }))

  error_msg = "coupons.coupons_error_loading"


  ngOnInit(): void {
    this.prepareEmptyStateData();
    this.handleColumns();
  }


  handleColumns(): void {
    this.columns = [
      { title: "coupons.table.thead.id", type: 'index', data: { prop: 'id' } },
      { title: "coupons.table.thead.name", type: 'text', data: { prop: 'name' } },
      { title: "coupons.table.thead.code", type: 'text', data: { prop: 'code' } },
      { title: "coupons.table.thead.start_date", type: 'date', data: { prop: 'startDate' } },
      { title: "coupons.table.thead.end_date", type: 'date', data: { prop: 'endDate' } },
      { title: "coupons.table.thead.status", type: 'status', data: { prop: 'status' } },
      { title: "coupons.table.thead.actions", type: 'actions', data: [{ id: "id", name: 'edit', url: '/Products/Coupons/New' }, { id: "id", name: 'delete' }], width: 280, },
    ];
  }
  prepareEmptyStateData(): void {
    this.emptyStateData = {
      title: 'coupons.no_coupon.title',
      description: 'coupons.no_coupon.description',
      withBtn: true,
      image: "assets/images/no_brands.svg",
      btnText: 'coupons.no_coupon.btnText',
      linkButton: "/Products/Coupons/New"
    }
  }

  setPage(page: any) {
    this.filterCriteria.page = page.offset + 1;
    this.coupons$ = this._coupons.getAllCoupons(this.filterCriteria)
  }

  setLimit(limit: any) {
    this.filterCriteria.limit = limit;
    this.coupons$ = this._coupons.getAllCoupons(this.filterCriteria)
  }

  actionClicked(event: any): void {
    switch (event.action) {
      case TABLE_ACTIONS.DELETE:
        this.deleteCoupon(event.id);
        break;
    }
  }

  deleteCoupon(id: any) {
    console.log(id);
    console.log(id)
    this._coupons
      .deleteCoupon(id)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe({
        next: (response: any) => {
          console.log(response)
          if (response) {
            this._toastrService.success(
              this._translocoService.translate('coupons.toast.delete_coupon.title'),
              this._translocoService.translate('coupons.toast.delete_coupon.subtitle'),
              { toastClass: 'toast ngx-toastr', closeButton: true }
            )
            this.coupons$ = this._coupons.getAllCoupons(this.filterCriteria)

          }
        },
        error: (error: any) => {
        }
      })
  }
}
