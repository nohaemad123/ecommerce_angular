import { DOCUMENT } from '@angular/common';
import { Component, DestroyRef, Inject, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { finalize, take } from 'rxjs';
import { country } from 'src/app/Data/models/country/country';
import { AuthService } from 'src/app/Data/services/auth.service';
import { Patterns} from '@Shared/services/pattern';
import { ToastrService } from 'ngx-toastr';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Validators as passwordMatch } from '@Shared/services/validators/validators'; // Adjust the path accordingly

@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {


  destroyRef = inject(DestroyRef);
  translocoService = inject(TranslocoService);
  _fb = inject(FormBuilder);
  _authenticationService = inject(AuthService);
  _router = inject(Router);

  showPassword: boolean = false;
  registerForm!: FormGroup;
  urlRegex = Patterns.urlRegex;

  countriesData!: country[];
  loading = false;
  passwordPattern = Patterns.passwordPattern;
  public errMsg = '';
  _toastrService = inject(ToastrService);
  _translocoService = inject(TranslocoService)

  constructor() {
      this.registerForm = this._fb.group({
        storeName: ['', [Validators.required, Validators.minLength(3)]],
        url: ['', [Validators.required, Validators.pattern(this.urlRegex)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordPattern)]],
        phoneNumber: [null, [Validators.required]],
        countryId: [null, [Validators.required]]
      });
     }

  ngOnInit(): void {
     this.getAllCountries()
  }

  getAllCountries(): void {
    this._authenticationService.getAllCountries().pipe(takeUntilDestroyed(this.destroyRef), take(1))
      .subscribe({
        next: (response) => {
          this.countriesData = response;
          
          console.log("countries: ",this.countriesData)
          this.registerForm.controls["countryId"].setValue(response[0]);
          if (response[0]?.countryPhoneCode === '+966') {
            this.registerForm.controls["phoneNumber"].setValidators([Validators.minLength(9), Validators.maxLength(9)])
          } else if (response[0]?.countryPhoneCode === '+20') {
            this.registerForm.controls["phoneNumber"].setValidators([Validators.minLength(11), Validators.maxLength(11)])
          }
        }
      })

  }



  togglePasswordTextType() {
    this.showPassword = !this.showPassword;
  }

  onSelectCountryCode(country: country): void {
    if (country?.countryPhoneCode === '+966') {
      this.registerForm.controls["phoneNumber"].setValidators([Validators.minLength(9), Validators.maxLength(9)])
    } else if (country?.countryPhoneCode === '+20') {
      this.registerForm.controls["phoneNumber"].setValidators([Validators.minLength(11), Validators.maxLength(11)])
    }
  }

  onRegister() {

     if (this.registerForm.invalid) {
      return;
    }



    this.loading = true;

    this._authenticationService
      .register(
        ({
          ...this.registerForm.value,
          countryId: this.registerForm.value.countryId?.id,
          phoneNumber: this.registerForm.value?.phoneNumber?.length === 9 ? this.registerForm.value.phoneNumber : this.registerForm.value.phoneNumber.slice(1)
        })
      )
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.loading = false))
      .subscribe({
        next: (response) => {
          if (response) {
            // this.handleLoginAfterRegistration();
            this._toastrService.success(
              this._translocoService.translate('auth.login.success_message.title'),
              this._translocoService.translate('auth.login.success_message.subtitle'),
              { toastClass: 'toast ngx-toastr', closeButton: true }
            )
            this._router.navigate(['/Auth/Sign-In']);
          }
        },
        error: (error) => {
          this.errMsg = error;
        }
      })
  }

  private handleLoginAfterRegistration() {
    const { email, password } = this.registerForm.controls;
    this._authenticationService
      .login(email.value, password.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          if (response?.ok) {
            this._toastrService.success(
              this._translocoService.translate('auth.register.success_message.title'),
              this._translocoService.translate('auth.register.success_message.subtitle'),
              { toastClass: 'toast ngx-toastr', closeButton: true }
            )
            this._router.navigate(['/Dashboard']);
          }
        }
      })
  }

}
