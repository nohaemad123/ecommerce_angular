import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyState } from 'src/app/Data/models/empty-state/empty-state';
import { TranslocoService } from '@ngneat/transloco';
import { CustomersService } from 'src/app/Data/services/customers.service';
import { FilterCriteria, IColumnType, Page } from 'src/app/Data/models/table/table';
import { FormControl } from '@angular/forms';
import { EMPTY, catchError, debounceTime, filter } from 'rxjs';

@Component({
  selector: 'app-customers',
  standalone: false,
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  _customers = inject(CustomersService);
  _translationService = inject(TranslocoService)

  emptyStateData!: EmptyState;
  filterCriteria: FilterCriteria = {
    page: 1,
    limit: 10,
    name: '',
    status: null
  };
  searchControl = new FormControl();
  columns: IColumnType[] = [];

  showError: boolean = false;
  customers$ = this._customers.getAllCustomers(this.filterCriteria).pipe(catchError((error) => {
    this.showError = true;
    return EMPTY; // or any other fallback value
  }))
  error_msg = "customers.customers_error_loading"

  ngOnInit(): void {
    this.prepareEmptyStateData();
    this.handleColumns();
    this.handleCustomersSearch();
  }

  handleColumns(): void {
    this.columns = [
      { title: "customers.ID", type: 'index', data: { prop: 'accountId' } },
      { title: "customers.TABLE.customerEmail", type: 'text', data: { prop: 'email' } },
      { title: "customers.TABLE.STATUS", type: 'status', data: { prop: 'userStatus' } },
      { title: "customers.TABLE.ACTIONS", type: 'actions', data: [{ id: "id", name: 'view', url: '/customers/view' }], width: 280, },
    ];
  }

  prepareEmptyStateData(): void {
    this.emptyStateData = {
      title: 'Customers.EMPTY.HEADER',
      description: 'Customers.EMPTY.SUB_HEADER',
      withBtn: false,
      image: "assets/images/no_brands.svg",
      btnText: 'Customers.EMPTY.SUB_HEADER',
      linkButton: "/customers/New"
    }
  }

  handleCustomersSearch(): void {
    this.searchControl.valueChanges
      .pipe(
        filter((q) => q?.trim()?.length >= 2 || q?.trim() == ''),
        debounceTime(500)
      ).subscribe((searchQuery: string) => {
        this.filterCriteria.name = searchQuery;
        this.filterCriteria.page = 1;
        this.customers$ = this._customers.getAllCustomers(this.filterCriteria)
      })
  }

  setPage(page: Page): void {
    this.filterCriteria.page = page.offset + 1;
    this.customers$ = this._customers.getAllCustomers(this.filterCriteria)
  }

  setLimit(limit: number): void {
    this.filterCriteria.limit = limit;
    this.customers$ = this._customers.getAllCustomers(this.filterCriteria)
  }

}
