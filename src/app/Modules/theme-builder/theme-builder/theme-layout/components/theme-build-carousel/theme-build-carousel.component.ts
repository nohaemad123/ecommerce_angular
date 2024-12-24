import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemeBuilderService } from 'src/app/Data/services/themebuilder.service';
import { ToastrService } from 'ngx-toastr';
import { TranslocoService } from '@ngneat/transloco';
import { HSOverlay } from 'preline';

@Component({
  selector: 'app-theme-build-carousel',
  standalone: false,
  templateUrl: './theme-build-carousel.component.html',
  styleUrls: ['./theme-build-carousel.component.scss']
})
export class ThemeBuildCarouselComponent {

  _fb = inject(FormBuilder)
  _themeBuilderService = inject(ThemeBuilderService);
  _toastrService = inject(ToastrService);
  _translocoService = inject(TranslocoService);
  // filterCriteria: FilterCriteria = {
  //   page: 1,
  //   limit: 999,
  //   name: '',
  //   status: null
  // }
  carouselForm!:FormGroup;
  FOLDERNAME = "themeBuildCarousel"
  sectionSelected:any;

  constructor(){
    this.carouselForm = this._fb.group({
      images: this._fb.array([])
    })
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._themeBuilderService.currentSectionSelected$.subscribe((res: any) => {
      console.log(res , "Carousel Selected");
      this.sectionSelected = res;
      // this.caroselForm.patchValue({


      // })
    })
    setTimeout(() => {
      window.HSStaticMethods.autoInit();
    }, 100);
    console.log(this.carouselForm.value);
    this.getSectionDetails();
  }

  getSectionDetails(){
    this._themeBuilderService.getPageSectionDetails(this._themeBuilderService.currentSectionSelected$.value.id).subscribe(res=>{
      console.log(res,"carousel")
      if(res.length == 0){
        this.addImage()
      }else{
        this.setFormArrayValues(res)
      }

    })
  }
  setFormArrayValues(values: any[]): void {
    const imageFormGroups = values.map(value => this._fb.group({
      imagePath: value.imagePath,
      title: value.title,
      titleEn: value.titleEn,
      id: value.id,
      isExternal: value.isExternal,
      url: value.url

    }));
    this.carouselForm.setControl('images', this._fb.array(imageFormGroups));
    console.log(this.carouselForm.value);

  }
  get images() {
    return this.carouselForm.controls["images"] as FormArray;
  }


  addImage(): void{
    const images = this.carouselForm.controls['images'] as FormArray;
    images.push(this._fb.group({
      "id": 0,
      "imagePath": ["", Validators.required],
      "title": "",
      "isExternal": false,
      "url": "",
      "titleEn": ""
    }));

  }
  onUploadIMG(imgURL: string,index:number) {
    const images = this.carouselForm.controls['images'] as FormArray;
    images.at(index).patchValue({"imagePath": imgURL})
    // this.carouselForm.patchValue({ img: imgURL })
    console.log(this.carouselForm.value);

  }

  removeImage(index:number){
    const images = this.carouselForm.controls['images'] as FormArray;
    images.removeAt(index);
  }


  onSubmitSection(){
    console.log(this.carouselForm.value);

     // console.log(mappingSectionTypeTopCategories);
     let body = {
      "images": this.carouselForm.value?.images,
      "sectionId": this.sectionSelected.id,
      "sectionTypeId": this.sectionSelected.sectionTypeId,
    }
  this._themeBuilderService
      .UpdateSectionTypeImage(body)
      .subscribe((res) => {
        console.log(res);
        HSOverlay.close(document.querySelector('#section-edit') as HTMLElement)
        HSOverlay.close(document.querySelector('#section-Add') as HTMLElement)

        this._themeBuilderService.updateSectionData$.next(true)

        this._toastrService.success(
          this._translocoService.translate('themeBuilder.component_category_slider.section_carousel_updated'),
          this._translocoService.translate('success'),
          { toastClass: 'toast ngx-toastr', closeButton: true }
        )
        })
  }

}
