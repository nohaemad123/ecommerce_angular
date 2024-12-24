import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsService } from 'src/app/Data/services/reports.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmptyState } from 'src/app/Data/models/empty-state/empty-state';
import { IColumnType, Page } from 'src/app/Data/models/table/table';
import { BehaviorSubject, EMPTY, catchError } from 'rxjs';

@Component({
  selector: 'app-coupons-sales',
  standalone: false,
  templateUrl: './coupons-sales.component.html',
  styleUrls: ['./coupons-sales.component.scss']
})
export class CouponsSalesComponent {

  _reportingService = inject(ReportsService)
  _fb = inject(FormBuilder);

  emptyStateData!: EmptyState;
  columns: IColumnType[] = [];
  reportForm: FormGroup;
  reportsError: boolean = false;
  filterCriteria: any = {
    page: 1,
    limit: 10,
    ProductId: 0,
    // startDate: new Date(),
    // endDate: new Date(),
  }

  coupons$ = this._reportingService.getAllCoupons()
  couponsSales$ = new BehaviorSubject<any>([]);

  error_msg = "reporting.coupons_error_loading"
  constructor() {
    this.reportForm = this._fb.group({
      couponId: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.prepareEmptyStateData();
    this.handleColumns();
  }

  handleColumns(): void {
    this.columns = [
      { title: "reporting.coupon_sale.table.id", type: 'index', width: 50, },
      { title: "reporting.coupon_sale.table.coupon_code", type: 'text', data: { prop: 'cuponCode' } },
      { title: "reporting.coupon_sale.table.coupon_creation_date", type: 'date', data: { prop: 'cuponCreationDate' } },
      { title: "reporting.coupon_sale.table.coupon_discount_type_name", type: 'text', data: { prop: 'cuponDiscountTypeName' } },
      { title: "reporting.coupon_sale.table.total_discount", type: 'text', data: { prop: 'totalDiscount' } },
    ];
  }

  prepareEmptyStateData(): void {
    this.emptyStateData = {
      title: 'reporting.coupon_sale.empty_state.title',
      description: 'reporting.coupon_sale.empty_state.description',
      withBtn: false,
      image: "assets/images/no_report.svg",
    }
  }

  setPage(page: Page): void {
    this.filterCriteria.page = page.offset + 1;
    this.onShowReport()
  }

  setLimit(limit: number): void {
    this.filterCriteria.limit = limit;
    this.onShowReport()
  }


  onShowReport() {
    console.log(this.reportForm.value);
    // this.couponsSales$ = this._reportingService.getCouponSale(this.filterCriteria)
    const { couponId, startDate, endDate } = this.reportForm.controls;
    this.filterCriteria.couponId = couponId.value;
    this.filterCriteria.startDate = startDate.value.toISOString();
    this.filterCriteria.endDate = endDate.value.toISOString();
      this._reportingService.getCouponSale(this.filterCriteria)
        .pipe(catchError(() => { this.reportsError = true; return EMPTY })).subscribe((response: any) => {
          if (response) {
            this.couponsSales$.next(response);
          }
        })
  }
}
