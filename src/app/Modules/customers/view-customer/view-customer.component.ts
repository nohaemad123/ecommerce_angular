import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from 'src/app/Data/services/customers.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-view-customer',
  standalone: false,
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.scss']
})
export class ViewCustomerComponent implements OnInit {

  _route = inject(ActivatedRoute);
  _customers = inject(CustomersService);
  _destroyRef = inject(DestroyRef);

  loading = false;
  customerID!: number;
  customerData!: any;

  constructor() {
    this.customerID = this._route.snapshot.queryParams['id'];
  }

  ngOnInit(): void {
    this.customerID ? this.getCustomerByID() : ''
  }

  getCustomerByID(): void {
    this._customers
      .getCustomerById(this.customerID)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe((response: any) => {
        if (response) {
         this.customerData = response;
        }
      })
  }

}
