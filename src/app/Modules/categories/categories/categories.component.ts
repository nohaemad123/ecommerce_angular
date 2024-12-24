import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { CategoriesService } from 'src/app/Data/services/categories.service';
import { CategoriesFilter } from 'src/app/Data/models/category/category';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EMPTY, catchError, debounceTime, filter } from 'rxjs';
import { RouterModule } from '@angular/router';
import { FilterCriteria, IColumnType, Page, TABLE_ACTIONS } from 'src/app/Data/models/table/table';
import { TableComponent } from '@Shared/components/table/table.component';
import { EmptyStateComponent } from '@Shared/components/empty-state/empty-state.component';
import { EmptyState } from 'src/app/Data/models/empty-state/empty-state';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  standalone: false,
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  _categories = inject(CategoriesService);
  _destroyRef = inject(DestroyRef);
  _toastrService = inject(ToastrService);
  _translocoService = inject(TranslocoService)

  emptyStateData!: EmptyState;
  filterCriteria: FilterCriteria = {
    page: 1,
    limit: 10,
    name: '',
    status: null
  }
  searchControl = new FormControl();
  columns: IColumnType[] = [];
  categoriesError: boolean = false;

  categories$ = this._categories.getAllCategories(this.filterCriteria).pipe(
    catchError(() => { this.categoriesError = true; return EMPTY })
  )

  error_msg="categories.categories_error_loading"


  constructor() {
  }

  ngOnInit(): void {
    this.prepareEmptyStateData()
    this.handleCategoriesSearch();
    this.handleColumns();
  }

  prepareEmptyStateData(): void {
    this.emptyStateData = {
      title: 'categories.list.no_categories.title',
      description: 'categories.list.no_categories.description',
      withBtn: true,
      image: "assets/images/no_brands.svg",
      btnText: 'categories.list.no_categories.btnText',
      linkButton: "/Products/Categories/New"
    }
  }


  handleColumns(): void {
    this.columns = [
      { title: "categories.list.table.thead.code", type: 'index', data: { prop: 'id' } },
      { title: "categories.list.table.thead.categories", type: 'avatar', data: { prop: 'name', src: "img", description: 'name' }, width: 280 },
      { title: "categories.list.table.thead.parent_category", type: 'objectItem', data: { prop: 'name', object: 'parentCategory'}, width: 280 },
      { title: "categories.list.table.thead.status", type: 'status', data: {prop: 'status'}},
      { title: "categories.list.table.thead.actions", type: 'actions', data: [{ id: "id", name: 'edit', url: '/Products/Categories/New' }, { id: "id", name: 'delete' }], width: 280, },
    ];
  }

  handleCategoriesSearch(): void {
    this.searchControl.valueChanges
      .pipe(
        filter((q) => q?.trim()?.length >= 1 || q?.trim() == ''),
        debounceTime(500),
      ).subscribe((searchQuery: string) => {
        this.filterCriteria.name = searchQuery;
        this.filterCriteria.page = 1;
        this.categories$ = this._categories.getAllCategories(this.filterCriteria)
      })
  }

  setPage(page: Page): void {
    this.filterCriteria.page = page.offset + 1;
    this.categories$ = this._categories.getAllCategories(this.filterCriteria)
  }

  setLimit(limit: number): void {
    this.filterCriteria.limit = limit;
    this.categories$ = this._categories.getAllCategories(this.filterCriteria)
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  actionClicked(event: any): void {
    switch (event.action) {
      case TABLE_ACTIONS.DELETE:
        this.deleteCategory(event.id);
        break;
    }
  }

  deleteCategory(id: number): void {
    console.log(id)
    this._categories
      .deleteCategory(id)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe({
        next: (response: any) => {
          if (response?.ok) {
            this._toastrService.success(
              this._translocoService.translate('categories.list.delete_category.title'),
              this._translocoService.translate('categories.list.delete_category.title'),
              { toastClass: 'toast ngx-toastr', closeButton: true }
            )
            this.categories$ = this._categories.getAllCategories(this.filterCriteria)

          }
        },
        error: (error: any) => {
        }
      })
  }

}
