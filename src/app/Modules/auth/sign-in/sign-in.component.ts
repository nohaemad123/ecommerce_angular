import { Component, DestroyRef, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, finalize, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from 'src/app/Data/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-sign-in',
  standalone: false,
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  destroyRef = inject(DestroyRef);
  _route = inject(ActivatedRoute);
  _router = inject(Router);
  _authenticationService = inject(AuthService);
  _fb = inject(FormBuilder)
  _toastrService = inject(ToastrService);
  _translocoService = inject(TranslocoService)

  loginForm!: FormGroup;
  showPassword: boolean = false;

  loading = false;
  submitted = false;
  public error = '';


  constructor() {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.handleRedirection();
  }

  handleRedirection(): void {
    if (this._authenticationService.currentUserValue) {
      this._router.navigate(['/Dashboard']);
    }
  }

  togglePasswordTextType(): void {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';
    const { email, password } = this.loginForm.controls;

    this._authenticationService
      .login(email.value, password.value)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.loading = false;
        }))
      .subscribe({
        next: (response: any) => {
          if (response?.ok) {
            this._toastrService.success(
              this._translocoService.translate('auth.login.success_message.title'),
              this._translocoService.translate('auth.login.success_message.subtitle'),
              { toastClass: 'toast ngx-toastr', closeButton: true }
            )
            this._router.navigate(['/Dashboard']);
          }
        },
        error: (error: any) => {
          this.error = error.error.responseMessage;
        }
      })
  }

}


