import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsService } from 'src/app/Data/services/reports.service';
import { EmptyState } from 'src/app/Data/models/empty-state/empty-state';
import { BehaviorSubject, EMPTY, catchError } from 'rxjs';
import { IColumnType, Page } from 'src/app/Data/models/table/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-categories-sales',
  standalone: false,
  templateUrl: './categories-sales.component.html',
  styleUrls: ['./categories-sales.component.scss']
})
export class CategoriesSalesComponent implements OnInit {
  _reportingService = inject(ReportsService)
  _fb = inject(FormBuilder);
  categories$ = this._reportingService.getAllCategories();

  selectedCategoryId: any;
  emptyStateData!: EmptyState;
  reportForm: FormGroup;

  filterCriteria: any = {
    page: 1,
    limit: 10,
    ProductId: 0,
    startDate: new Date(),
    endDate: new Date(),
  }
  categorySales$ = new BehaviorSubject<any>([]);
  columns: IColumnType[] = [];
  reportsError: boolean = false;
  error_msg = "reporting.categories_error_loading"

  constructor() {
    this.reportForm = this._fb.group({
      categoryId: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.prepareEmptyStateData()
    this.handleColumns()
    this.filterCriteria = {
      page: this.filterCriteria.page,
      limit: this.filterCriteria.limit,
      ProductId: this.selectedCategoryId ? this.selectedCategoryId : 0,
      startDate: this.filterCriteria.startDate,
      endDate: this.filterCriteria.endDate,
    }
  }

  prepareEmptyStateData(): void {
    this.emptyStateData = {
      title: 'reporting.category_sale.empty_state.title',
      description: 'reporting.category_sale.empty_state.description',
      withBtn: false,
      image: "assets/images/no_report.svg",
    }
  }

  handleColumns(): void {
    this.columns = [
      { title: "reporting.category_sale.table.id", type: 'index', width: 50, },
      { title: "reporting.category_sale.table.category", type: 'text', data: { prop: 'categoryName' }, width: 150, },
      { title: "reporting.category_sale.table.quantity", type: 'text', data: { prop: 'brandName' }, width: 150, },
      { title: "reporting.category_sale.table.before", type: 'text', data: { prop: 'pricebeforeDiscount' }, width: 150, },
      { title: "reporting.category_sale.table.discount", type: 'text', data: { prop: 'discountValue' }, width: 80, },
      { title: "reporting.category_sale.table.net", type: 'text', data: { prop: 'net' }, width: 80 },
      { title: "reporting.category_sale.table.tax", type: 'text', data: { prop: 'taxValue' }, width: 120 },
      { title: "reporting.category_sale.table.profit", type: 'text', data: { prop: 'profit' }, width: 80 },
      { title: "reporting.category_sale.table.after_tax", type: 'text', data: { prop: 'priceafterTax' }, width: 80 }
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
    const { categoryId, startDate, endDate } = this.reportForm.controls;
    this.filterCriteria.categoryId = categoryId.value;
    this.filterCriteria.startDate = startDate.value.toISOString();
    this.filterCriteria.endDate = endDate.value.toISOString();
      this._reportingService.getCategorySale(this.filterCriteria)
        .pipe(catchError(() => { this.reportsError = true; return EMPTY })).subscribe((response: any) => {
          if (response) {
            this.categorySales$.next(response);
          }
        })
  }
}
