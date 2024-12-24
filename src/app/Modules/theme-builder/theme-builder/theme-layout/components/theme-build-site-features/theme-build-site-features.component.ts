import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemeBuilderService } from 'src/app/Data/services/themebuilder.service';
import { ToastrService } from 'ngx-toastr';
import { HSOverlay } from 'preline';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-theme-build-site-features',
  standalone: false,
  templateUrl: './theme-build-site-features.component.html',
  styleUrls: ['./theme-build-site-features.component.scss']
})
export class ThemeBuildSiteFeaturesComponent {
  _fb = inject(FormBuilder)
  _themeBuilderService = inject(ThemeBuilderService);
  _toastrService = inject(ToastrService);
  _translocoService = inject(TranslocoService);
  siteFeatureForm!:FormGroup;

  sectionSelected:any;

  constructor(){
    this.siteFeatureForm = this._fb.group({
      features: this._fb.array([])
    })
  }
  items: any = [];
  icons:any;


  ngOnInit(): void {
    this._themeBuilderService.currentSectionSelected$.subscribe(res => {
      console.log(res , "category Selected");
      this.sectionSelected = res;

    })
    // this.getAllFonts()
    this.getSectionDetails();

  }

  getSectionDetails(){
    this._themeBuilderService.getPageSectionDetails(this._themeBuilderService.currentSectionSelected$.value.id).subscribe(res=>{
      console.log(res,"carousel")
      if(res.length == 0){
        this.addFeature()
      }else{
        this.setFormArrayValues(res)
      }

    })
  }
  setFormArrayValues(values: any[]): void {
    const imageFormGroups = values.map(value => this._fb.group({
      id: value.id,
      img: value.img,
      title: value.title,
      titleEn: value.titleEn,
      "desc": value.desc,
      "descEn": value.descEn
    }));
    this.siteFeatureForm.setControl('features', this._fb.array(imageFormGroups));
    console.log(this.siteFeatureForm.value);

  }

  get features() {
    return this.siteFeatureForm.controls["features"] as FormArray;
  }
  addFeature(){
    const features = this.siteFeatureForm.controls['features'] as FormArray;
    features.push(this._fb.group({
      "id": 0,
      "sectionId":  this.sectionSelected.id,
      "sectionTypeId":  this.sectionSelected.sectionTypeId,
      "img": "",
      "title": ["",Validators.required],
      "desc": "",
      "descEn": "",
      "titleEn": ["",Validators.required],
    }));
    setTimeout(() => {
      window.HSStaticMethods.autoInit();
    }, 100);
  }

  removeFeature(index:number){
       const images = this.siteFeatureForm.controls['features'] as FormArray;
      images.removeAt(index);
   }

  getAllFonts() {

    this._themeBuilderService.getAllFontAwesome().subscribe((fontAwesome) => {
      console.log(fontAwesome,"font");

      let icons: any[] = [];
      for (const icon in fontAwesome) {
        const value = fontAwesome[icon];
        for (const style of value.styles) {
          icons.push(`fa-${style} fa-${icon}`);
        }
        this.icons = icons;
        console.log(this.icons);
      }
    })
  }

  onSubmitSection(){
    console.log(this.siteFeatureForm.value);
    let body = {
      sectionId: this.sectionSelected.sectionId,
      sectionTypeId: this.sectionSelected.sectionTypeId,
      featuers: this.siteFeatureForm.value.features,
    };
    this._themeBuilderService
    .UpdateSectionTypeSiteFeatuers(body)
    .subscribe((res: any) => {
      HSOverlay.close(document.querySelector('#section-edit') as HTMLElement)
      HSOverlay.close(document.querySelector('#section-Add') as HTMLElement)


      this._toastrService.success(
        this._translocoService.translate('themeBuilder.component_category_slider.section_site_feature_updated'),
        this._translocoService.translate('success'),
        { toastClass: 'toast ngx-toastr', closeButton: true }
      );

    })
  }

}
