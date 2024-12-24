import { Component, DestroyRef, OnInit, ViewChild, inject } from '@angular/core';
import { OrdersService } from 'src/app/Data/services/orders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterCriteria, IColumnType } from 'src/app/Data/models/table/table';
import { OrderStatus } from 'src/app/Data/models/order/order-status';
import { EMPTY, catchError, finalize, map } from 'rxjs';
import { Order } from 'src/app/Data/models/order/orders';
import { StatusList } from 'src/app/Data/models/table/table';
import { ToastrService } from 'ngx-toastr';
import { TranslocoService } from '@ngneat/transloco';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { popupComponent } from '@Shared/components/popup/popup.component';

@Component({
  selector: 'app-view-order',
  standalone: false,
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {

  order!: any;
  orderService = inject(OrdersService)
  _route = inject(ActivatedRoute);
  _toastrService = inject(ToastrService);
  _translocoService = inject(TranslocoService)
  _destroyRef = inject(DestroyRef);
  _router = inject(Router)

  @ViewChild('popup') private popup!: popupComponent;

  openTab = 1;
  columns: IColumnType[] = [];
  statusList = [
    { id: 1, name: 'Canceled', class: 'text-red-600 font-medium text-sm' },
    { id: 2, name: 'Completed', class: 'text-[#009262] font-medium text-sm' },
    { id: 3, name: 'Delivered', class: 'text-[#009262] font-medium text-sm' },
    { id: 4, name: 'Delivering', class: 'text-[#009262] font-medium text-sm' },
    { id: 5, name: 'Denied', class: 'text-[#009262] font-medium text-sm' },
    { id: 6, name: 'Expired', class: 'text-[#009262] font-medium text-sm' },
    { id: 7, name: 'Failed', class: 'text-[#009262] font-medium text-sm' },
    { id: 8, name: 'Pending', class: 'badge-light-warning' },
    { id: 9, name: 'Processing', class: 'text-[#009262] font-medium text-sm' },
    { id: 10, name: 'Refunded', class: 'text-[#009262] font-medium text-sm' },
    { id: 11, name: 'Revised', class: 'text-[#009262] font-medium text-sm' },
    { id: 12, name: 'Prepared', class: 'text-[#009262] font-medium text-sm' },
  ];

  orderStatusLoading = false;
  orderStatuses = OrderStatus;
  orderHistoryError: boolean = false;
  orderHistory$ = this.orderService.getOrderHistory(this._route.snapshot.queryParams['id']).pipe(
    catchError(() => { this.orderHistoryError = true; return EMPTY })
  )
  error_msg = "";

  orderHistoryColumn: IColumnType[] = []
  orderLoading = true
  orderDetailsError: boolean = false;

  orderDetails$ = this.orderService.getOrderById(this._route.snapshot.queryParams['id']).pipe(
    catchError(() => { this.orderDetailsError = true; return EMPTY })
  )

  orderFilter: FilterCriteria = {
    page: 1,
    limit: 10,
  }

  shippingMethods = this.orderService.getShippingMethods();
  selectedShippingMethod = '';
  shippingLoading = false;
  orderId = this._route.snapshot.queryParams['id'];

  constructor() {
  }

  ngOnInit(): void {
    this.handleColumns();
  }

  handleColumns() {
    this.columns = [
      { title: "orders.view_order.order_details_table.thead.id", type: 'index', data: { prop: 'id' } },
      { title: "orders.view_order.order_details_table.thead.product_name", type: 'avatar', data: { prop: 'productName', src: "image", description: 'name' }, width: 280 },
      { title: "orders.view_order.order_details_table.thead.quantity", type: 'text', data: { prop: 'quantity' } },
      { title: "orders.view_order.order_details_table.thead.unit_price", type: 'text', data: { prop: 'unitPrice' } },
      { title: "orders.view_order.order_details_table.thead.total_price", type: 'text', data: { prop: 'totalPrice' } },
    ];

    this.orderHistoryColumn = [
      { title: "orders.view_order.order_history_table.thead.id", type: 'index', data: { prop: 'orderId' } },
      { title: "orders.view_order.order_history_table.thead.customer_nodified", type: 'text', data: { prop: 'isCustomerNotified' } },
      { title: "orders.view_order.order_history_table.thead.order_status", type: 'status', data: { prop: 'orderStatusId' } },
    ]
  }


  toggleTabs($tabNumber: number) {
    this.openTab = $tabNumber;
  }

  getStatus(name: string) {
    return this.statusList.find(o => o.name == name);
  }

  changeOrderStatus(orderDetails: Order) {
    let status = null;
    if (orderDetails.statusId === this.orderStatuses.Pending) {
      status = this.orderStatuses.Revised;
    } else {
      status = this.orderStatuses.Prepared;
    }

    this.orderStatusLoading = true;

    this.handleOrderStatus(status)
  }

  changeOrderReject(statusId: number) {
    this.handleOrderStatus(statusId)
  }

  handleOrderStatus(status: number) {
    this.orderService
      .changeOrderStatus(this._route.snapshot.queryParams['id'], status)
      .pipe(
        finalize(() => this.orderStatusLoading = false)
      )
      .subscribe(
        (response: any) => {
          if (response === true) {
            if (status === 15) {
              this._toastrService.success(
                this._translocoService.translate('orders.view_order.revise_order_success.title'),
                this._translocoService.translate('orders.view_order.revise_order_success.subtitle'),
                { toastClass: 'toast ngx-toastr', closeButton: true }
              )
            } else if (status === 16) {
              this._toastrService.success(
                this._translocoService.translate('orders.view_order.prepare_order_success.title'),
                this._translocoService.translate('orders.view_order.prepare_order_success.subtitle'),
                { toastClass: 'toast ngx-toastr', closeButton: true }
              )
            } else {
              this._toastrService.success(
                this._translocoService.translate('orders.view_order.reject_order_success.title'),
                this._translocoService.translate('orders.view_order.reject_order_success.subtitle'),
                { toastClass: 'toast ngx-toastr', closeButton: true }
              )
            }
            // let msg = this.order.statusId === this.orderStatuses.Pending ? 'orderRevised' : 'orderPrepared';
            // this._alertService.showSuccessAlert("Success", msg);
            this.orderDetails$ = this.orderService.getOrderById(this._route.snapshot.queryParams['id']).pipe(
              catchError(() => { this.orderDetailsError = true; return EMPTY })
            )

            // this._router.navigateByUrl('/orders');
          }
        },
      )
  }

  selectShippingMethod(method: any): void {
    this.selectedShippingMethod = method.key;
  }

  onConfirmShipping(): void {
    switch (this.selectedShippingMethod) {
      case 'OTO':
        this.handleOTOShippingMethod();
        break;
      case 'Manual':
        this.handleManualShippingMethod();
        break;
      default:
        break;
    }
  }

  handleOTOShippingMethod(): void {
    this.shippingLoading = true;
    this.orderService.shippingWithOTO([+this._route.snapshot.queryParams['id']]).pipe(
      takeUntilDestroyed(this._destroyRef)
    ).subscribe((response: any) => {
      if (response.ok) {
        this._toastrService.success(
          this._translocoService.translate('orders.shippingMethodSuccess'),
          this._translocoService.translate('orders.orderSentForShipping'),
          { toastClass: 'toast ngx-toastr', closeButton: true }
        );
        this.orderDetails$ = this.orderService.getOrderById(this._route.snapshot.queryParams['id']).pipe(
          catchError(() => { this.orderDetailsError = true; return EMPTY })
        )
      }
      this.shippingLoading = false;
    }, (error: any) => {
      this.shippingLoading = false;
    })
  }


  handleManualShippingMethod(): void {
    console.log(this.popup);
    this.popup.open().subscribe((confirm: any) => {
      if(confirm) {
        this.orderDetails$ = this.orderService.getOrderById(this._route.snapshot.queryParams['id']).pipe(
          catchError(() => { this.orderDetailsError = true; return EMPTY })
        )
      }
    })
    // this.popup.open();
  }

}
