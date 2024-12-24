import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsService } from 'src/app/Data/services/reports.service';
import { EmptyState } from 'src/app/Data/models/empty-state/empty-state';
import { IColumnType, Page } from 'src/app/Data/models/table/table';
import { BehaviorSubject, EMPTY, Observable, catchError } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-products-sale',
  standalone: false,
  templateUrl: './products-sale.component.html',
  styleUrls: ['./products-sale.component.scss']
})
export class ProductsSaleComponent implements OnInit {

  _reportingService = inject(ReportsService);
  _fb = inject(FormBuilder);


  products$ = this._reportingService.getAllProducts()
  selectedProductId: any;
  reportForm: FormGroup;
  filterCriteria: any = {
    page: 1,
    limit: 10,
    ProductId: 0,
    // startDate: new Date(),
    // endDate: new Date(),
  }

  emptyStateData!: EmptyState;
  productSales$ = new BehaviorSubject<any>([]);
  // = this._reportingService.getProductSale(this.filterCriteria).pipe(
  //    catchError(() => { this.reportsError = true; return EMPTY }))
  columns: IColumnType[] = [];
  reportsError!: boolean;
  error_msg = "reporting.products_error_loading"


  constructor() {
    this.reportForm = this._fb.group({
      productId: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.prepareEmptyStateData()
    this.handleColumns()
    this.filterCriteria = {
      page: this.filterCriteria.page,
      limit: this.filterCriteria.limit,
      ProductId: this.selectedProductId ? this.selectedProductId : 0,
      startDate: this.filterCriteria.startDate,
      endDate: this.filterCriteria.endDate,
    }
  }

  prepareEmptyStateData(): void {
    this.emptyStateData = {
      title: 'reporting.product_sale.empty_state.title',
      description: 'reporting.product_sale.empty_state.description',
      withBtn: false,
      image: "assets/images/no_report.svg",
    }
  }

  handleColumns(): void {
    this.columns = [
      { title: "#", type: 'index', width: 50, },
      { title: "reporting.product_sale.table.productName", type: 'text', data: { prop: 'productName' }, width: 150, },
      { title: "reporting.product_sale.table.brandName", type: 'text', data: { prop: 'brandName' }, width: 150, },
      { title: "reporting.product_sale.table.before", type: 'text', data: { prop: 'pricebeforeDiscount' }, width: 150, },
      { title: "reporting.product_sale.table.discount", type: 'text', data: { prop: 'discountValue' }, width: 80, },
      { title: "reporting.product_sale.table.net", type: 'text', data: { prop: 'net' }, width: 80 },
      { title: "reporting.product_sale.table.tax", type: 'text', data: { prop: 'taxValue' }, width: 120 },
      { title: "reporting.product_sale.table.profit", type: 'text', data: { prop: 'profit' }, width: 80 },
      { title: "reporting.product_sale.table.after_tax", type: 'text', data: { prop: 'priceafterTax' }, width: 80 }
    ];
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
    const { productId, startDate, endDate } = this.reportForm.controls;
      this.filterCriteria.ProductId = productId.value;
      this.filterCriteria.startDate = startDate.value.toISOString();
      this.filterCriteria.endDate = endDate.value.toISOString();
       this._reportingService.getProductSale(this.filterCriteria)
      .pipe(catchError(() => { this.reportsError = true; return EMPTY }))
      .subscribe((response: any) => {
        if (response) {
          this.productSales$.next(response);
        }
      })
   }
}
