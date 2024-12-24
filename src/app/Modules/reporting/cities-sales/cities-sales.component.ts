import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsService } from 'src/app/Data/services/reports.service';
import { EmptyState } from 'src/app/Data/models/empty-state/empty-state';
import { BehaviorSubject, EMPTY, catchError } from 'rxjs';
import { IColumnType, Page } from 'src/app/Data/models/table/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cities-sales',
  standalone: false,
  templateUrl: './cities-sales.component.html',
  styleUrls: ['./cities-sales.component.scss']
})
export class CitiesSalesComponent implements OnInit {
  _reportingService = inject(ReportsService)
  _fb = inject(FormBuilder);
  selectedCityId: any;
  emptyStateData!: EmptyState;
  reportForm: FormGroup;
  filterCriteria: any = {
    page: 1,
    limit: 10,
    ProductId: 0,
    startDate: new Date(),
    endDate: new Date(),
  }
  cities$ = this._reportingService.getAllCities()
  citySales$ = new BehaviorSubject<any>([]);
  columns: IColumnType[] = [];
  reportsError: boolean = false;
  error_msg = "reporting.cities_error_loading"

  constructor() {
    this.reportForm = this._fb.group({
      cityId: [''],
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
      ProductId: this.selectedCityId ? this.selectedCityId : 0,
      startDate: this.filterCriteria.startDate,
      endDate: this.filterCriteria.endDate,
    }
  }

  prepareEmptyStateData(): void {
    this.emptyStateData = {
      title: 'reporting.city_sale.empty_state.title',
      description: 'reporting.city_sale.empty_state.description',
      withBtn: false,
      image: "assets/images/no_report.svg",
    }
  }

  handleColumns(): void {
    this.columns = [
      { title: "reporting.city_sale.table.id", type: 'index', width: 50, },
      { title: "reporting.city_sale.table.city_name", type: 'text', data: { prop: 'cityName' } },
      { title: "reporting.city_sale.table.city_sale", type: 'text', data: { prop: 'totalSale' } }
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
      // this._reportingService.getCitySale(this.filterCriteria)

      const { cityId, startDate, endDate } = this.reportForm.controls;
      this.filterCriteria.cityId = cityId.value;
      this.filterCriteria.startDate = startDate.value.toISOString();
      this.filterCriteria.endDate = endDate.value.toISOString();
        this._reportingService.getCitySale(this.filterCriteria)
          .pipe(catchError(() => { this.reportsError = true; return EMPTY })).subscribe((response: any) => {
            if (response) {
              this.citySales$.next(response);
            }
          })
  }
}
