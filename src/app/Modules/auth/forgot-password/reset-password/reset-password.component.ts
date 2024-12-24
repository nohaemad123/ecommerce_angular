import { UtilsService } from '@Shared/services/utils.service';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/Data/services/auth.service';
import { Validators as passwordMatch } from '@Shared/services/validators/validators'; // Adjust the path accordingly
import { ToastrService } from 'ngx-toastr';
import { TranslocoService } from '@ngneat/transloco';


@Component({
  selector: 'app-reset-password',
  standalone: false,
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  destroyRef = inject(DestroyRef)
  _utilSrv = inject(UtilsService);
  _route = inject(ActivatedRoute);
  _router = inject(Router);
  _authService = inject(AuthService);
  _fb = inject(FormBuilder);

  emailVerification:string;
  resetForm: FormGroup;
  errMsg!: string;
  loading: boolean = false;
  _toastrService = inject(ToastrService);
  _translocoService = inject(TranslocoService)
  
  constructor(){
    this.emailVerification = this._route.snapshot.queryParams['email']
    this.resetForm = this._fb.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    },{
      validator: passwordMatch.mustMatch('password', 'confirmPassword')
    });
  }


  onSubmit(){
    console.log(this.resetForm.value);
    this.loading = true;
    this.errMsg = '';
    const { password,confirmPassword } = this.resetForm.controls;

    this._authService
        .resetPassword(this.emailVerification,password.value,confirmPassword.value)
        .pipe(takeUntilDestroyed(this.destroyRef),finalize(() => this.loading = false))
        .subscribe({next: (res) => {
          console.log(res);
          if (res) {
            this.handleLoginAfterRegistration()
          }
        },error: (errors) =>{
          if (errors) {
            this.errMsg = errors;
          }
        }})
  }

  private handleLoginAfterRegistration() {
    const { password } = this.resetForm.controls;
    this._authService
      .login(this.emailVerification, password.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          if (response?.ok) {
            this._toastrService.success(
              this._translocoService.translate('auth.reset_password.success_message.title'),
              this._translocoService.translate('auth.reset_password.success_message.subtitle'),
              { toastClass: 'toast ngx-toastr', closeButton: true }
            )
            this._router.navigate(['/Dashboard']);
          }
        },error: (errors) =>{
          if (errors) {
            this.errMsg = errors.error.responseMessage;
          }
        }
      })
  }
}
