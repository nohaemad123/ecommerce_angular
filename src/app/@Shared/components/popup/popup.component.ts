import { Component, DestroyRef, ElementRef, EventEmitter, Input, Output, ViewChild, inject } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Subject, first } from "rxjs";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "@danielmoncada/angular-datetime-picker";
import { FormsModule } from "@angular/forms";
import { TranslocoModule, TranslocoService } from "@ngneat/transloco";
import { OrdersService } from "src/app/Data/services/orders.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: 'modal-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['popup.component.scss'],
    imports: [CommonModule, OwlDateTimeModule, TranslocoModule, FormsModule, OwlNativeDateTimeModule],
    standalone: true,
})
export class popupComponent {

    _translocoService = inject(TranslocoService);
    _destroyRef = inject(DestroyRef);
    orderService = inject(OrdersService)
    _toastrService = inject(ToastrService);

    @ViewChild('modelOpenBtn') private modelOpenBtn!: ElementRef<HTMLButtonElement>;
    @ViewChild('modelCloseBtn') private modelCloseBtn!: ElementRef<HTMLButtonElement>;
    @Input() orderId!: number;
    confirm$: Subject<boolean> = new Subject<boolean>();
    deliveryDate: any;
    loading = false;
    minDate = new Date();

    open() {
        this.modelOpenBtn.nativeElement.click();
        return this.confirm$.asObservable().pipe(first());
    }

    onConfirm(): void {
        this.loading = true;
        this.orderService.updateOrderEstimation(
            { orderId: this.orderId, deliveryEstimationPeriod: this.deliveryDate.toISOString() }
        ).pipe(
            takeUntilDestroyed(this._destroyRef),
        ).subscribe((response: any) => {
            if (response.ok) {
                this._toastrService.success(
                    this._translocoService.translate('orders.DeliveryEstimationText'),
                    this._translocoService.translate('orders.Success'),
                    { toastClass: 'toast ngx-toastr', closeButton: true }
                )
                this.confirm$.next(true);
                this.close();
            }
            this.loading = false;
        }, (error: any) => {
            this.loading = false;
        })
    }

    close() { this.modelCloseBtn.nativeElement.click(); }
}
