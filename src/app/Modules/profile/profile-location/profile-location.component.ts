import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { ToastrService } from 'ngx-toastr';
import {HSOverlay} from 'preline/preline'
import { country } from 'src/app/Data/models/country/country';
import { AuthService } from 'src/app/Data/services/auth.service';
import { ProfileService } from 'src/app/Data/services/profile.service';

@Component({
  selector: 'app-profile-location',
  standalone: false,
  templateUrl: './profile-location.component.html',
  styleUrls: ['./profile-location.component.scss']
})
export class ProfileLocationComponent implements OnInit {
  countryService = inject(AuthService)
  profileService = inject(ProfileService)
  allCountries!: country[]
  updateStoreAddress!: FormGroup
  _fb = inject(FormBuilder)
  allCities: any
  loading = false;
  _toastrService = inject(ToastrService);
  _translocoService = inject(TranslocoService)
  storeAddress$:any
  router=inject(Router)
  constructor() {

  }

  ngOnInit(): void {
    this.initStoreProfile()
    this.getAllCountries()
    this.getStoreProfile()
  }

  getAllCountries() {
    this.countryService.getAllCountries().subscribe((response: any) => {
      this.allCountries = response
      this.updateStoreAddress.controls["countryId"].setValue(response[0].id);
      this.getCityById(response[0].id)
    })
  }

  getCityById(country_id: any) {
    this.profileService.getAllCities(country_id).subscribe((response: any) => {
      this.allCities = response
      this.updateStoreAddress.controls["cityId"].setValue(response[0].id);
    })
  }

  getStoreProfile() {
    this.profileService.getStoreAdress().subscribe((response: any) => {
      this.storeAddress$ = response
      console.log("storeProfile: ", this.storeAddress$)
      this.updateStoreAddress.patchValue(response)

    })

  }


  onSelectCountry(event: any) {
    console.log("id: ",event.target.value)
    this.getCityById(event.target.value)
  }

  initStoreProfile() {
    this.updateStoreAddress = this._fb.group({
      countryId: [null],
      cityId: [null],
      address: ["", Validators.required],
      postalCode: ["", Validators.required],
      street: ["", Validators.required],
      neighborhood: ["", Validators.required],
      buildingNumber: ["", Validators.required],
      number: [null]
    })
  }

  onUpdateStoreAddress() {
    if (this.updateStoreAddress.invalid) {
      return;
    }
    this.loading = true;

    console.log("update profile: ", this.updateStoreAddress.value)
    this.
      profileService.updateStoreAdress(this.updateStoreAddress.value)
      .subscribe((response: any) => {
        this.loading = false;
        if (response) {
          this._toastrService.success(
            this._translocoService.translate('profile.store_address.success_message.title'),
            this._translocoService.translate('profile.store_address.success_message.subtitle'),
            { toastClass: 'toast ngx-toastr', closeButton: true }
          )
          const modal = document.querySelector('#hs-large-modal') as HTMLElement

          HSOverlay.close(modal);
          }
      })
  }
}

