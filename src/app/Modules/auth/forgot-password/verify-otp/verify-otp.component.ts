import { UtilsService } from '@Shared/services/utils.service';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/Data/services/auth.service';

@Component({
  selector: 'app-verify-otp',
  standalone: false,
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOTPComponent implements OnInit {
  destroyRef = inject(DestroyRef)
  _utilSrv = inject(UtilsService);
  _route = inject(ActivatedRoute);
  _router = inject(Router);
  _authService = inject(AuthService);
  _fb = inject(FormBuilder);

  emailVerification:string;
  verifyForm: FormGroup;
  errMsg!: string;
  loading: boolean = false;
  _toastrService = inject(ToastrService);
  _translocoService = inject(TranslocoService)
  
  constructor() {
    this.emailVerification = this._route.snapshot.queryParams['email']
    this.verifyForm = this._fb.group({
      pin1: ['', [Validators.required,Validators.minLength(1),Validators.maxLength(1)]],
      pin2: ['', [Validators.required,Validators.minLength(1),Validators.maxLength(1)]],
      pin3: ['', [Validators.required,Validators.minLength(1),Validators.maxLength(1)]],
      pin4: ['', [Validators.required,Validators.minLength(1),Validators.maxLength(1)]],
    });
   }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.

    // call countdown and sent as min
    this._utilSrv.startCountdown(2);
  }

  resend(){
    this.errMsg = '';
    const { pin1,pin2,pin3,pin4 } = this.verifyForm.controls;

    this._authService
        .forgotPassword(this.emailVerification)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({next: (res) => {
          console.log(res);
        },error: (errors) =>{
          if (errors) {
            this.errMsg = errors;
          }
        }})
  }

  onSubmit(){
    this.loading = true;
    this.errMsg = '';
    const { pin1,pin2,pin3,pin4 } = this.verifyForm.controls;
    // this._router.navigate(['/Auth/Forgot-Password/Verify/ResetPassword'],{queryParams:{email:this.emailVerification}})

    this._authService
        .checkOTP(pin1.value + pin2.value + pin3.value + pin4.value, this.emailVerification)
        .pipe(takeUntilDestroyed(this.destroyRef),finalize(() => this.loading = false))
        .subscribe({next: (res) => {
          console.log(res);
          if (res) {
            this._toastrService.success(
              this._translocoService.translate('auth.verify_otp.success_message.title'),
              this._translocoService.translate('auth.verify_otp.success_message.subtitle'),
              { toastClass: 'toast ngx-toastr', closeButton: true }
            )
            this._router.navigate(['/Auth/Forgot-Password/Verify/ResetPassword'],{queryParams:{email:this.emailVerification}})
          }
        },error: (errors) =>{
          if (errors) {
            this.errMsg = errors;
          }
          console.log("AAAAAAAAAA",errors);
        }})
  }

}
