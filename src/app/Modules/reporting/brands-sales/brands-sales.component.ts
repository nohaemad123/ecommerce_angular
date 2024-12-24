import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyState } from 'src/app/Data/models/empty-state/empty-state';
import { FilterCriteria, IColumnType, Page } from 'src/app/Data/models/table/table';
import { ReportsService } from 'src/app/Data/services/reports.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, EMPTY, Observable, catchError } from 'rxjs';

@Component({
  selector: 'app-brands-sales',
  standalone: false,
  templateUrl: './brands-sales.component.html',
  styleUrls: ['./brands-sales.component.scss']
})
export class BrandsSalesComponent {

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
    startDate: new Date(),
    endDate: new Date(),
  }
  brandsSales$ = new BehaviorSubject<any>([]);

  brands$ = this._reportingService.getAllBrands()
  error_msg = "reporting.brands_error_loading"

  constructor() {
    this.reportForm = this._fb.group({
      brandId: [''],
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
      { title: "reporting.brand_sale.table.id", type: 'index', width: 50, },
      { title: "reporting.brand_sale.table.brand_name", type: 'text', data: { prop: 'brandName' } },
      { title: "reporting.brand_sale.table.brand_sale", type: 'text', data: { prop: 'totalSale' } }
    ];
  }

  prepareEmptyStateData(): void {
    this.emptyStateData = {
      title: 'reporting.brand_sale.empty_state.title',
      description: 'reporting.brand_sale.empty_state.description',
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
    const { brandId, startDate, endDate } = this.reportForm.controls;
    this.filterCriteria.brandId = brandId.value;
    this.filterCriteria.startDate = startDate.value.toISOString();
    this.filterCriteria.endDate = endDate.value.toISOString();
      this._reportingService.getBrandSale(this.filterCriteria)
        .pipe(catchError(() => { this.reportsError = true; return EMPTY })).subscribe((response: any) => {
          if (response) {
            this.brandsSales$.next(response);
          }
        })
  }
}
