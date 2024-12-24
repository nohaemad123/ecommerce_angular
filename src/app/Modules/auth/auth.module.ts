import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyOTPComponent } from './forgot-password/verify-otp/verify-otp.component';
import { ResetPasswordComponent } from './forgot-password/reset-password/reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { NusAlertComponent } from "@Shared/components/nus-alert/nus-alert.component";
import { TranslocoModule } from '@ngneat/transloco';
import { ToastrModule } from 'ngx-toastr';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SliderAuthComponent } from "../../@Shared/components/slider-auth/slider-auth.component";


const routes: Routes = [
  {path: '', pathMatch : 'full', redirectTo: 'Sign-In'},
  {
    path: 'Sign-In',
    component: SignInComponent
  },
  {
    path: 'Sign-Up',
    component: SignUpComponent
  },
  {
    path: 'Forgot-Password',
    component: ForgotPasswordComponent
  },
  {
    path: 'Forgot-Password/Verify',
    component: VerifyOTPComponent
  },
  {
    path: 'Forgot-Password/Verify/ResetPassword',
    component: ResetPasswordComponent
  },
];

@NgModule({
    declarations: [
        SignInComponent,
        SignUpComponent,
        ForgotPasswordComponent,
        VerifyOTPComponent,
        ResetPasswordComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        TranslocoModule,
        ToastrModule.forRoot(),
        NgSelectModule,
        NusAlertComponent,
        CarouselModule,
        SliderAuthComponent
    ]
})
export class AuthModule { }
