import { Component, Input, inject, NgModule, Injector, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeBuilderService } from 'src/app/Data/services/themebuilder.service';
import { TranslocoService } from '@ngneat/transloco';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HSOverlay } from 'preline';
import { ThemeBuildBigBannerComponent } from '../components/theme-build-big-banner/theme-build-big-banner.component';
import { ThemeBuildCarouselComponent } from '../components/theme-build-carousel/theme-build-carousel.component';
import { ThemeBuildBrandsSliderComponent } from '../components/theme-build-brands-slider/theme-build-brands-slider.component';
import { ThemeBuildCategoriesSliderComponent } from '../components/theme-build-categories-slider/theme-build-categories-slider.component';
import { ThemeBuildProductsComponent } from '../components/theme-build-products/theme-build-products.component';
import { ThemeBuildSiteFeaturesComponent } from '../components/theme-build-site-features/theme-build-site-features.component';
import { ToastrService } from 'ngx-toastr';
export interface ComponentData {
injector: Injector|undefined;
  "titleEn": string;
  "id": number;
  "order": number;
  "sectionTypeId": number;
  "sectionType": string;
  "title": string;
}
export const Value = new InjectionToken<any>('value', { providedIn: 'root', factory: () => 'value' });

@Component({
  selector: 'nav-setting',
  standalone: false,
  templateUrl: './nav-setting.component.html',
  styleUrls: ['./nav-setting.component.scss']
})
export class NavSettingComponent {

  _themeBuilderService = inject(ThemeBuilderService);
  _translocoService = inject(TranslocoService);
  _fb = inject(FormBuilder);
  inj = inject(Injector);
  _toastrService = inject(ToastrService);

  currentLang = this._translocoService.langChanges$;
  @Input() setting!: any;
  customURL = false;
  pageSettingForm!: FormGroup;
  submitLoading = false;
  displayedSections:any[] = [];
  sections = [
    {
      id: 3, name: 'themeBuilder.sections.carousel', image: 'https://apieke.ekestore.net//Fathy/themebuilder/d84232c5-2a6b-4d5f-bc7d-b801f428d413.svg'
    },
    {
      id: 5, name: 'themeBuilder.sections.brand_slider', image: 'https://apieke.ekestore.net//Fathy/themebuilder/4b13927f-137d-4795-97e1-da83e789c2b6.svg'
    },
    {
      id: 6, name: 'themeBuilder.sections.category_slider', image: 'https://apieke.ekestore.net//Fathy/themebuilder/28869a2d-c16a-498f-a8cb-25156677dbb2.svg'
    },

    {
      id: 10, name: 'themeBuilder.sections.big_banner', image: 'https://apieke.ekestore.net//Fathy/themebuilder/3da9382e-66e8-4852-971a-7131753a6584.svg'
    },

    {
      id: 11, name: 'themeBuilder.sections.site_features', image: 'https://apieke.ekestore.net//Fathy/themebuilder/44f0dfda-7428-4669-aa29-7dc5ad3e9147.svg'
    },
    {
      id: 12, name: 'themeBuilder.sections.products', image: 'https://apieke.ekestore.net//Fathy/themebuilder/e20ce000-b742-4c37-a3db-16d6b37dc330.svg'
    },

  ]
  components =
    [
      { id: 3 , component: ThemeBuildCarouselComponent,  value: {} as ComponentData },
      { id: 5 , component: ThemeBuildBrandsSliderComponent,  value: {} as ComponentData },
      { id: 6 , component: ThemeBuildCategoriesSliderComponent,  value: {} as ComponentData},
      { id: 10, component: ThemeBuildBigBannerComponent, value: {} as ComponentData    },
      { id: 11, component: ThemeBuildSiteFeaturesComponent,  value: {} as ComponentData },
      { id: 12, component: ThemeBuildProductsComponent,  value: {} as ComponentData },
    ];


  constructor() {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.pageSettingForm = this._fb.group({
      title: [{ value: '', disabled: this.setting?.canBeModified == false ? true : false }, [Validators.required]],
      titleEn: [{ value: '', disabled: this.setting?.canBeModified == false ? true : false }, [Validators.required]],
      nameURL: [{ value: '', disabled: this.setting?.canBeModified == false ? true : false }],
      showInNavigation: true,
      showInFooter: false
    })
    console.log(this.setting,"setting");

    this.pageSettingForm.patchValue({
      title: this.setting.title,
      titleEn: this.setting.titleEn,
      nameURL: this.setting.nameURL,
      showInNavigation: this.setting.showInNavigation,
      showInFooter: this.setting.showInFooter
    })
    this._themeBuilderService.updateSectionData$.subscribe(data => {

      console.log("data",data,"data");
      if (data) {
        this.refreshPageData(this.setting?.id)
      }
    })
    setTimeout(() => {
      window.HSStaticMethods.autoInit();
    }, 100);

  }

  trackByFun(index: number, component: any): any {

    return component.sectionTypeId;
  }

  editSection(page:any){
    page.sectionMode = "edit";

    this.displayedSections = [page];
    console.log(this.displayedSections,"page");

    this._themeBuilderService.currentSectionSelected$.next(page);
    // HSOverlay.open(openBtn);

  }
  deleteSection(page:any){
    console.log(page.id);
    this._themeBuilderService
    .deleteSection(page?.id)
    .subscribe((res: any) => {
      // this._themeBuilderService.showNavSettings$.next(false);
      this.refreshPageData(this.setting?.id);
      this._toastrService.success(
        this._translocoService.translate('themeBuilder.component_category_slider.page_updated'),
        this._translocoService.translate('success'),
        { toastClass: 'toast ngx-toastr', closeButton: true }
      );

    })

  }
  getInputData(sectionTypeId: number): any {

    const componentMapping = this.components.find(comp => comp.id === sectionTypeId);
    const inputData = componentMapping ? componentMapping.component: {};
    // console.log('Input Data for component', sectionTypeId, ':', inputData);
    return inputData;
  }
  getComponent(sectionTypeId: number){
    let componentMapping:any = this.components.find(comp => comp.id === sectionTypeId);
    return componentMapping ? componentMapping.component : null;

  }
  addSection(section:any){
    const componentBasedOnSection = this.components.find(comp => comp.id === section.id);
    let page = {
      sectionType : section.name,
      sectionTypeId : section.id,
      title : "صنف جديد",
      titleEn : "New Section",
      sectionMode : "add"
    };
    console.log("aaaaaaa",section);
    this._themeBuilderService.addSection({
      pageId : this.setting.id,
      sectionTypeId : section.id,
      id:0
    }).subscribe(section => {
      this.refreshPageData(this.setting?.id);

      this.displayedSections = [page];
      this._themeBuilderService.currentSectionSelected$.next(section);
      HSOverlay.close(document.querySelector('#section-Add') as HTMLElement)
      HSOverlay.open(document.querySelector('#section-edit') as HTMLElement)
    })

  }


  onSubmitPageSetting(){
    console.log(this.pageSettingForm.value);
    this.setting?.id ?  this.updatePage() : this.addPage()

  }

  addPage(){
    this._themeBuilderService
    .addPage(this.pageSettingForm.value)
    .subscribe((res: any) => {
      this._themeBuilderService.showNavSettings$.next(false);

      this._toastrService.success(
        this._translocoService.translate('themeBuilder.component_category_slider.page_updated'),
        this._translocoService.translate('success'),
        { toastClass: 'toast ngx-toastr', closeButton: true }
      );
     })
  }

  updatePage(){
    this._themeBuilderService
    .updatePage(this.setting?.id,this.pageSettingForm.value)
    .subscribe((res: any) => {
      this._themeBuilderService.showNavSettings$.next(false);
      this.refreshPageData(this.setting?.id);

      this._toastrService.success(
        this._translocoService.translate('themeBuilder.component_category_slider.page_updated'),
        this._translocoService.translate('success'),
        { toastClass: 'toast ngx-toastr', closeButton: true }
      );
     })
  }

  refreshPageData(pageId:number) {
    this._themeBuilderService.getPageById(pageId).subscribe((res: any) => {
      this.setting = res;
      console.log("refreshPageData SETTING", this.setting);
      console.log("refreshPageData GETTING", res);


      this.pageSettingForm.patchValue({
        title: this.setting.title,
        titleEn: this.setting.titleEn,
        nameURL: this.setting.nameURL,
        showInNavigation: this.setting.showInNavigation,
        showInFooter: this.setting.showInFooter
      })
    })
  }
}
