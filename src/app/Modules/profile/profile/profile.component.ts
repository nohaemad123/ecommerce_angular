import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { ToastrService } from 'ngx-toastr';
import { country } from 'src/app/Data/models/country/country';
import { AuthService } from 'src/app/Data/services/auth.service';
import { ENDPOINT } from 'src/app/Data/services/endpoint/endpoint';
import { ProfileService } from 'src/app/Data/services/profile.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  storeProfile$: any;
  profileService = inject(ProfileService)
  updateStoreProfile!: FormGroup
  _fb = inject(FormBuilder)
  authService = inject(AuthService)
  allCountries!: country[]
  FOLDERNAME = ENDPOINT.GENERAL.FOLDER_NAME.PROFILE
  logoImg: string | null | undefined;
  iconImg: string | null | undefined;
  loading = false;
  _toastrService = inject(ToastrService);
  _translocoService = inject(TranslocoService)
  localization: any

  constructor() {

  }

  ngOnInit(): void {
    this.initStoreProfile()
    this.getStoreProfile()
    this.getAllCountries()
  }

  getStoreProfile() {
    this.profileService.getStoreProfile().subscribe((response: any) => {
      this.storeProfile$ = response
      console.log("storeProfile: ", this.storeProfile$)
      this.updateStoreProfile.patchValue(response)
      if (response.mobileCountryId1 === 2) {
        this.updateStoreProfile.patchValue({ mobilePhone1: '0' + this.updateStoreProfile.value?.mobilePhone1 });
        this.updateStoreProfile.controls["mobilePhone1"].setValidators([Validators.minLength(11), Validators.maxLength(11)])
        this.updateStoreProfile.controls["mobilePhone1"].updateValueAndValidity
      }
      if (response.whatsAppCountryId === 2) {
        this.updateStoreProfile.patchValue({ whatsAppNumber: '0' + this.updateStoreProfile.value?.whatsAppNumber });
        this.updateStoreProfile.controls["whatsAppNumber"].setValidators([Validators.minLength(11), Validators.maxLength(11)])
        this.updateStoreProfile.controls["whatsAppNumber"].updateValueAndValidity
      }
      if (response.mobileCountryId2 === 2) {
        this.updateStoreProfile.patchValue({ mobilePhone2: '0' + this.updateStoreProfile.value?.mobilePhone2 });
        this.updateStoreProfile.controls["mobilePhone2"].setValidators([Validators.minLength(11), Validators.maxLength(11)])
        this.updateStoreProfile.controls["mobilePhone2"].updateValueAndValidity
      }

      
      this.logoImg = response.metaLogoWebsite;
      this.iconImg = response.metaIconWebsite
    })

    this.profileService.getStoreAdress().subscribe((response: any) => {
      // this.localization = response.buildingNumber + response.street + response.cityName + response.countryName
      this.updateStoreProfile.patchValue({ location: response.buildingNumber + ' ' + response.street + ' ' + response.cityName + ' ' + response.countryName })
      // console.log("localization: ", this.localization)
    })
  }

  getAllCountries() {
    this.authService.getAllCountries().subscribe((response: any) => {
      this.allCountries = response
      console.log("allCountries: ", this.allCountries)
      // this.updateStoreProfile.patchValue({mobileCountryId1:response[0]})
      // this.updateStoreProfile.patchValue({whatsAppCountryId:response[0]})
      // this.updateStoreProfile.patchValue({mobileCountryId2:response[0]})
      if (response[0]?.countryPhoneCode === '+966') {
        this.updateStoreProfile.controls["mobilePhone1"].setValidators([Validators.minLength(9), Validators.maxLength(9)])
        this.updateStoreProfile.controls["whatsAppNumber"].setValidators([Validators.minLength(9), Validators.maxLength(9)])
        this.updateStoreProfile.controls["mobilePhone2"].setValidators([Validators.minLength(9), Validators.maxLength(9)])
      } else if (response[0]?.countryPhoneCode === '+20') {
        this.updateStoreProfile.controls["mobilePhone1"].setValidators([Validators.minLength(11), Validators.maxLength(11)])
        this.updateStoreProfile.controls["whatsAppNumber"].setValidators([Validators.minLength(11), Validators.maxLength(11)])
        this.updateStoreProfile.controls["mobilePhone2"].setValidators([Validators.minLength(11), Validators.maxLength(11)])
      }
    })
  }

  initStoreProfile() {
    this.updateStoreProfile = this._fb.group({
      name: ["", [Validators.required, Validators.maxLength(300)]],
      metaDescription: ["", Validators.maxLength(100)],
      metaLogoWebsite: [""],
      metaIconWebsite: [""],
      localTelephone: ["", Validators.required],
      mobilePhone1: ["", [Validators.required]],
      mobileCountryId1: [null],
      mobilePhone2: ["", Validators.required],
      mobileCountryId2: [null],
      whatsAppNumber: [""],
      whatsAppCountryId: [null],
      email: ["", [Validators.required, Validators.email]],
      maroofNumber: [""],
      instagramLink: [""],
      twitterLink: [""],
      facebookLink: [""],
      youtubeLink: [""],
      snapchatLink: [""],
      tiktokLink: [""],
      telegramLink: [""],
      maroofLink: [""],
      iphoneLink: [""],
      location: [""],
      androidLink: [""]
    })
  }

  onSelectCountryCode(event: any): void {
    console.log(event.target.value)
    if (event?.target.value == "1") {
      this.updateStoreProfile.controls["mobilePhone1"].setValidators([Validators.minLength(9), Validators.maxLength(9)])
    } else if (event?.target.value == "2") {
      this.updateStoreProfile.controls["mobilePhone1"].setValidators([Validators.minLength(11), Validators.maxLength(11)])
    }
  }

  onSelectCountryCodeWhatsapp(event: any): void {
    console.log(event.target.value)
    if (event?.target.value == "1") {
      this.updateStoreProfile.controls["whatsAppNumber"].setValidators([Validators.minLength(9), Validators.maxLength(9)])
    } else if (event?.target.value == "2") {
      this.updateStoreProfile.controls["whatsAppNumber"].setValidators([Validators.minLength(11), Validators.maxLength(11)])
    }
  }

  onSelectCountryCodePhone2(event: any): void {
    console.log(event.target.value)
    if (event?.target.value == "1") {
      this.updateStoreProfile.controls["mobilePhone2"].setValidators([Validators.minLength(9), Validators.maxLength(9)])
    } else if (event?.target.value == "2") {
      this.updateStoreProfile.controls["mobilePhone2"].setValidators([Validators.minLength(11), Validators.maxLength(11)])
    }
  }

  onUploadLogo(imgURL: string) {
    this.updateStoreProfile.patchValue({ metaLogoWebsite: imgURL })
  }

  onUploadIcon(imgURL: string) {
    this.updateStoreProfile.patchValue({ metaIconWebsite: imgURL })
  }

  onUpdateStoreProfile() {
    if (this.updateStoreProfile.invalid) {
      return;
    }
    this.loading = true;

    let updateProfile = ({
      ...this.updateStoreProfile.value,
      mobilePhone1: this.updateStoreProfile.value?.mobilePhone1?.length === 9 ? this.updateStoreProfile.value.mobilePhone1 : this.updateStoreProfile.value.mobilePhone1.slice(1),
      whatsAppNumber: this.updateStoreProfile.value?.whatsAppNumber?.length === 9 ? this.updateStoreProfile.value.whatsAppNumber : this.updateStoreProfile.value.whatsAppNumber.slice(1),
      mobilePhone2: this.updateStoreProfile.value?.mobilePhone2?.length === 9 ? this.updateStoreProfile.value.mobilePhone2 : this.updateStoreProfile.value.mobilePhone2.slice(1),
    })

    console.log("update profile: ", updateProfile)
    this.
      profileService.updateStoreProfile(updateProfile)
      .subscribe((response: any) => {
        this.loading = false;
        if (response) {
          this._toastrService.success(
            this._translocoService.translate('profile.store_profile.success_message.title'),
            this._translocoService.translate('profile.store_profile.success_message.subtitle'),
            { toastClass: 'toast ngx-toastr', closeButton: true }
          )
          this.getStoreProfile()
        }
      })
  }
}