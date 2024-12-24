import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { ToastrService } from 'ngx-toastr';
import { finalize, map } from 'rxjs';
import { CouponsService } from 'src/app/Data/services/coupons.service';
import { ENDPOINT } from 'src/app/Data/services/endpoint/endpoint';

@Component({
  selector: 'app-new-coupons',
  standalone: false,
  templateUrl: './new-coupons.component.html',
  styleUrls: ['./new-coupons.component.scss']
})
export class NewCouponsComponent {

 // injectable
 _fb = inject(FormBuilder);
 _route = inject(ActivatedRoute);
 _router = inject(Router);
 _couponService = inject(CouponsService);
 _toastrService = inject(ToastrService);
 _translocoService = inject(TranslocoService);

  // private variables
  FOLDERNAME = ENDPOINT.GENERAL.FOLDER_NAME.COUPONS;
  updatedIMG: string | null | undefined;
  newCouponForm!: FormGroup;
  openTab = 1;
  submitLoading = false;
  couponID: any;
  statusChecked: boolean = true;

  _couponDiscountTypeId = this._couponService.getAllDiscountType().pipe(map(discount => {
    this.newCouponForm.patchValue({couponDiscountTypeId:discount[0].id})
    return discount
  }));

  constructor(){
    this.newCouponForm = this._fb.group({
      nameAr: ["", [Validators.required]],
      nameEn: ["", [Validators.required]],
      startDate: [new Date(), [Validators.required]],
      expiryDate: ["", [Validators.required]],
      code: ["", [Validators.required]],
      couponDiscountTypeId: ["", [Validators.required]],
      couponAmount:[0, [Validators.required]],
      status: [true],
      allowFreeShipping: [true, [Validators.required]],
      excludeSaleProducts: [true, [Validators.required]],
      maximumSpend: [0, [Validators.required]],
      usageLimitPerCoupon: [0, [Validators.required]],
      usageLimitPerCustomer: [0, [Validators.required]],
    });
    this.couponID = this._route.snapshot.queryParams['id'];
    this.couponID ? this.getCouponById(this.couponID) : ''
  }


  toggleTabs($tabNumber: number) {
    this.openTab = $tabNumber;
  }

  getCouponById(couponID:number){
    this._couponService.getCouponById(couponID).subscribe(res =>{
      console.log(res);
      this.newCouponForm.patchValue({
        nameAr: res.nameAr,
        nameEn: res.nameEn,
        startDate: res.startDate,
        expiryDate:  res.expiryDate,
        code:  res.code,
        couponDiscountTypeId:  res.couponDiscountTypeId,
        status:  res.status === 'NotActivated' ? false : true,
        excludeSaleProducts:  res.excludeSalesItems,
        couponAmount:  res.couponAmount,
        usageLimitPerCoupon:  res.usageLimitPerCoupon,
        maximumSpend:res.maximumSpend,
        usageLimitPerCustomer:  res.usageLimitPerCustomer,
      })

      res.status == 'NotActivated' ? this.statusChecked = false : true
      // if(res.status== 'NotActivated'){
      //   this.statusChecked=true
      // }else{
      //   this.statusChecked=false
      // }
    })


  }

  toggleCheck(event:any) {
    if(event.target.checked){
      this.statusChecked=true
    }else{
this.statusChecked=false
    }

    console.log(this.statusChecked)
  }

  createCode(){
    this._couponService.generateCode().subscribe((couponCode: string) => {
      this.newCouponForm.controls['code'].setValue(couponCode);
    })
  }

  onSubmitNewCoupon(){

    if (this.couponID) {
      this.editCoupon()
   } else {
      this.addCoupon();
   }

  }

  addCoupon(){
    console.log(this.newCouponForm.value);
    if(this.statusChecked){
      this.newCouponForm.controls['status'].setValue(1)
    }else{
      this.newCouponForm.controls['status'].setValue(2)
    }
    this._couponService.addCoupon(this.newCouponForm.value)
    .pipe(finalize(()=> this.submitLoading = false  ))
    .subscribe(res =>{
        console.log(res);
        this._toastrService.success(
          this._translocoService.translate('coupons.new_coupon.form.add_coupon_success.title'),
          this._translocoService.translate('coupons.new_coupon.form.add_coupon_success.subtitle'),
          { toastClass: 'toast ngx-toastr', closeButton: true }
        )
        this._router.navigate(['/Products/Coupons']);
  })
  }

  editCoupon(){
    if(this.statusChecked){
      this.newCouponForm.controls['status'].setValue(1)
    }else{
      this.newCouponForm.controls['status'].setValue(2)
    }
    this._couponService.updateCoupon(this.newCouponForm.value,this.couponID)
    .pipe(finalize(()=> this.submitLoading = false  ))
    .subscribe(res =>{
        console.log(res);
        this._toastrService.success(
          this._translocoService.translate('coupons.new_coupon.form.edit_coupon_success.title'),
          this._translocoService.translate('coupons.new_coupon.form.edit_coupon_success.subtitle'),
          { toastClass: 'toast ngx-toastr', closeButton: true }
        )
        this._router.navigate(['/Products/Coupons']);
  })
  }




}
