import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsList, FilterCriteria, IActions, Page, StatusList, TABLE_ACTIONS } from 'src/app/Data/models/table/table';
import { Router } from '@angular/router';
import { ColumnMode, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { TranslocoModule } from '@ngneat/transloco';
import { CategoriesFilter } from 'src/app/Data/models/category/category';
import { ENDPOINT } from 'src/app/Data/services/endpoint/endpoint';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, NgxDatatableModule, TranslocoModule, FormsModule, ReactiveFormsModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {
  
  isOpen: boolean = false;

  toggleDropdown(event: MouseEvent): void {
    this.isOpen = !this.isOpen;
    event.stopPropagation(); // Prevent click event from propagating to document click
  }
  @Input('columns') columns!: any[];
  @Output() actionEmitter: EventEmitter<any> = new EventEmitter();
  @Output() setPageEvent: EventEmitter<any> = new EventEmitter();
  @Output() setLimitEvent: EventEmitter<any> = new EventEmitter();

  @Input('rows') rows!: any;
  @Input('SelectedRows') SelectedRows: any = [];
  @ViewChild('tableRowDetails') tableRowDetails: any;
  public SelectionType = SelectionType;
  @Input() filter!: FilterCriteria;
  displayedColumns: string[] = [];
  // dataSource: any;
  actionsList = ActionsList;
  StatusList = StatusList
  _router = inject(Router)
  ColumnMode = ColumnMode;
  private ENDPOINT = ENDPOINT;
  baseUrlImage = this.ENDPOINT.urlApiFile

  ngOnInit(): void {
    console.log("rows: ",this.rows)
    setTimeout(() => {
      window.HSStaticMethods.autoInit();
    }, 100);
  }

  getOptionIcon(name: string) {
    return this.actionsList.find(o => o.name == name)?.icon
  }

  getStatus(id: string) {
    return this.StatusList.find(o => o.enum == id)
  }


  clickable() {
    // try {
    //   let actions = this.columns.find(o => o.type == 'actions')?.data as any[]
    //   let action = actions.find(o => o.name == 'edit');
    //   if (action)
    //     return true
    //   else
    //     return false;
    // } catch (error) {
    //   return false;

    // }

  }



  getCollapsedActions(col: IActions) {
    return col.data?.filter(o => o.collapsed == true);
  }

  getNotCollapsedActions(col: IActions) {
    return col.data?.filter(o => o.collapsed != true);
  }

  onSelect(selected: any) {
    // console.log('Select Event', selected, this.SelectedRows);
  }


  actionClicked(data: any, id: number): void {
    let modal = data.modal;
    // debugger;
    switch (data.name) {
      case 'edit':
        this.actionEmitter.emit({ action: TABLE_ACTIONS.EDIT, id, modal });
        break;
      case 'delete':
        this.actionEmitter.emit({ action: TABLE_ACTIONS.DELETE, id, modal });
        break;
    }
    data.url && this._router.navigate([data.url], { queryParams: { id: id } });
  }

  setPage(page: Page): void {
    this.setPageEvent.emit(page);
  }

  setLimit(limit: number): void {
    this.setLimitEvent.emit(limit);
  }


  changeSource(event: any): void {
    let fallback_path = 'assets/images/no-img.jpg';
    event.target.src = fallback_path;
  }

}
