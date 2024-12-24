import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyState } from 'src/app/Data/models/empty-state/empty-state';
import { FilterCriteria, IColumnType, Page } from 'src/app/Data/models/table/table';
import { OrdersService } from 'src/app/Data/services/orders.service';
import { EMPTY, catchError } from 'rxjs';

@Component({
  selector: 'app-orders',
  standalone: false,
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  emptyStateData!: EmptyState;
  columns: IColumnType[] = [];
  _orders = inject(OrdersService);
  _destroyRef = inject(DestroyRef);
  filterCriteria: FilterCriteria = {
    page: 1,
    limit: 10
  }
  ordersError: boolean = false;

  orders$ = this._orders.getAllOrders(this.filterCriteria).pipe(
    catchError(() => { this.ordersError = true; return EMPTY })
  )

  error_msg="orders.order_error_loading"

  constructor() {

  }

  ngOnInit(): void {
    this.prepareEmptyStateData();
    this.handleColumns();
  }

  prepareEmptyStateData(): void {
    this.emptyStateData = {
      title: 'orders.no_orders.title',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      withBtn: false,
      image: "assets/images/no_orders.svg",
    }
  }

  handleColumns(): void {
    this.columns = [
      { title: "orders.table.thead.id", type: 'index', data: { prop: 'id' } },
      { title: "orders.table.thead.tracking_number", type: 'text', data: { prop: 'trackingNumber' } },
      { title: "orders.table.thead.customer_name", type: 'objectItem', data: { prop: 'customerName', object: 'customerData' } },
      { title: "orders.table.thead.email", type: 'objectItem', data: { prop: 'customerEmail', object: 'customerData' } },
      { title: "orders.table.thead.total", type: 'text', data: { prop: 'total' } },
      { title: "orders.table.thead.payment_method", type: 'text', data: { prop: 'paymentType' } },
      { title: "orders.table.thead.status", type: 'status', data: { prop: 'statusId' } },
      { title: "orders.table.thead.actions", type: 'actions', data: [{ id: "id", name: 'view', url: '/orders/view' }] },
    ];
  }

  setPage(page: Page): void {
    this.filterCriteria.page = page.offset + 1;
    this.orders$ = this._orders.getAllOrders(this.filterCriteria)
  }

  setLimit(limit: number): void {
    this.filterCriteria.limit = limit;
    this.orders$ = this._orders.getAllOrders(this.filterCriteria)
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
