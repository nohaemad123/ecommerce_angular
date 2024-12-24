import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Data/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  destroyRef = inject(DestroyRef)

  _fb = inject(FormBuilder);
  _authService = inject(AuthService);
  _router = inject(Router);
  forgotForm: FormGroup;
  loading = false;
  errMsg!: string;
  _toastrService = inject(ToastrService);
  _translocoService = inject(TranslocoService)
  
  constructor(){
    this.forgotForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }


  onSubmit(){
    console.log(this.forgotForm.value);
    this.loading = true;
    this.errMsg = '';
    const { email } = this.forgotForm.controls;

    this._authService
        .forgotPassword(email.value)
        .pipe(takeUntilDestroyed(this.destroyRef),finalize(() => this.loading = false))
        .subscribe({next: (res) => {
          console.log(res);
          if (res) {
            this._toastrService.success(
              this._translocoService.translate('auth.forget_password.success_message.title'),
              this._translocoService.translate('auth.forget_password.success_message.subtitle'),
              { toastClass: 'toast ngx-toastr', closeButton: true }
            )
            this._router.navigate(['/Auth/Forgot-Password/Verify'],{queryParams:{email:email.value}})
        
          }
        },error: (errors) =>{
          if (errors) {
            this.errMsg = errors;
          }
          console.log("AAAAAAAAAA",errors);

        }})
  }
}
