import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { CategoriesService } from 'src/app/Data/services/categories.service';
import { ENDPOINT } from 'src/app/Data/services/endpoint/endpoint';

@Component({
  selector: 'app-new-category',
  standalone: false,
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss']
})
export class NewCategoryComponent implements OnInit {
  newEditCategoryForm!: FormGroup;
  openTab = 1;
  _formBuilder = inject(FormBuilder);
  isChecked: boolean = false;
  _categoriesService = inject(CategoriesService)
  destroyRef = inject(DestroyRef);
  categoriesData!: any;
  FOLDERNAME = ENDPOINT.GENERAL.FOLDER_NAME.CATEGORY
  updatedIMG: string | null | undefined;
  loading = false;
  _toastrService = inject(ToastrService);
  _translocoService = inject(TranslocoService)
  _router = inject(Router)
  category_ID_route: number;
  _route = inject(ActivatedRoute);
  category_id: any
  statusChecked: boolean = true;

  constructor() {
    this.category_ID_route = this._route.snapshot.queryParams['id'];
  }

  ngOnInit(): void {
    this.initCategoryForm()
    this.getAllCategories()
    this.checkValiationCategories()
    if (this.category_ID_route) {
      this.getCategoryById()
    }
  }

  getCategoryById() {
    this._categoriesService
      .getCategoryById(this.category_ID_route)
      .subscribe((response: any) => {
        if (response) {
          this.newEditCategoryForm.patchValue({
            name: response.name,
            nameEn: response.nameEn,
            description: response.description,
            descriptionEn: response.descriptionEn,
            img: response.img,
            status: response.status,
            metaTitle: response.metaTitle,
            metaTitleEn: response.metaTitleEn,
            metaDescription: response.metaDescription,
            metaDescriptionEn: response.metaDescriptionEn
          })
        }

        this.updatedIMG = response.img;
        if(response.status==1){
          this.statusChecked=true
        }else{
          this.statusChecked=false
        }
        if(response.parentCategory!==null){
          this.isChecked=true;
          this.newEditCategoryForm.controls['parentCategoryId'].setValue(response.parentCategory.id)
        }



        console.log("statusChecked:", this.statusChecked)
      })
  }
  toggleTabs($tabNumber: number) {
    this.openTab = $tabNumber;
  }

  initCategoryForm(): void {
    this.newEditCategoryForm = this._formBuilder.group({
      name: ["", [Validators.required]],
      nameEn: ["", [Validators.required]],
      description: ["", [Validators.required]],
      descriptionEn: ["", [Validators.required]],
      img: ["", [Validators.required]],
      status: [1],
      parentCategoryId: ["", [Validators.required]],
      bannerImg: ["img"],
      metaTitle:[''],
      metaTitleEn: [''],
      metaDescription: [''],
      metaDescriptionEn: [""]
    });
  }

  getAllCategories() {
    this._categoriesService.getAllCategories({page:1,limit:10,name:'',status:null}).pipe(takeUntilDestroyed(this.destroyRef), take(1))
      .subscribe({
        next: (response) => {
          this.categoriesData = response.items;
        }
      })

  }



  checkCategory($event: any) {
    if ($event.target.checked) {
      this.isChecked = true
      this.newEditCategoryForm.controls["parentCategoryId"].setValidators([
        Validators.required
      ]);
      console.log(this.isChecked)
    }

    else {
      this.isChecked = false
      this.newEditCategoryForm.controls["parentCategoryId"].clearValidators();
      this.newEditCategoryForm.controls["parentCategoryId"].setValue(null)
      console.log(this.isChecked)

    }
  }

  checkValiationCategories() {
    if (this.isChecked) {
      this.newEditCategoryForm.controls["parentCategoryId"].setValidators([
        Validators.required
      ]);
    }
    else {
      this.newEditCategoryForm.controls["parentCategoryId"].clearValidators();
      this.newEditCategoryForm.controls["parentCategoryId"].setValue(null)
    }
  }

  compareWith(item: any, selected: any): boolean {
    return item === selected;
  }

  onUploadIMG(imgURL: string) {
    this.newEditCategoryForm.patchValue({ img: imgURL })
  }

  onSubmitNewCategories() {
    console.log("category_id: ", this.category_id)
    if (this.category_ID_route) {
       this.editCategory()
    } else {
       this.addCategory();
    }
  }

  addCategory() {
    console.log("...this.newEditCategoryForm.value: ", this.newEditCategoryForm.value)
    if (this.newEditCategoryForm.invalid) {
      return;
    }
    this.loading = true;

    if(this.statusChecked){
      this.newEditCategoryForm.controls['status'].setValue(1)
    }else{
      this.newEditCategoryForm.controls['status'].setValue(2)
    }

    this._categoriesService
      .addCategory(this.newEditCategoryForm.value)
      .subscribe((response: any) => {
        this.loading = false;

        this._toastrService.success(
          this._translocoService.translate('categories.add_edit.form.add_category_success.title'),
          this._translocoService.translate('categories.add_edit.form.add_category_success.subtitle'),
          { toastClass: 'toast ngx-toastr', closeButton: true }
        )
        this._router.navigate(['/Products/Categories']);

      })

  }


  toggleCheck(event:any) {
    if(event.target.checked){
      this.statusChecked=true
    }else{
this.statusChecked=false
    }

    console.log(this.statusChecked)
  }



  editCategory() {
    console.log("...this.newEditCategoryForm.value: ", this.newEditCategoryForm.value)
    if (this.newEditCategoryForm.invalid) {
      return;
    }
    this.loading = true;

    if(this.statusChecked){
      this.newEditCategoryForm.controls['status'].setValue(1)
    }else{
      this.newEditCategoryForm.controls['status'].setValue(2)
    }
    this._categoriesService
      .updateCategory(this.newEditCategoryForm.value, this.category_ID_route)
      .subscribe((response: any) => {
        this.loading = false;

        this._toastrService.success(
          this._translocoService.translate('categories.add_edit.form.edit_category_success.title'),
          this._translocoService.translate('categories.add_edit.form.edit_category_success.subtitle'),
          { toastClass: 'toast ngx-toastr', closeButton: true }
        )
        this._router.navigate(['/Products/Categories']);

      })
  }

}
