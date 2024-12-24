import { Component, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropzoneComponent, DropzoneConfigInterface, DropzoneModule } from 'ngx-dropzone-wrapper';
import { ENDPOINT } from 'src/app/Data/services/endpoint/endpoint';
import { ToastrService } from 'ngx-toastr';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'upload-image',
  standalone: true,
  imports: [CommonModule,DropzoneModule,TranslocoModule],
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent {

  private ENDPOINT = ENDPOINT;
  baseUrlImage=ENDPOINT.urlApiFile
  private _toastrService = inject(ToastrService);
  @Input() disabled:boolean = false;
  @Input({required:true}) folderName:string = '';
  @Input() imgURL: any;
  @Input() multiple = false;
  @Output() onUpload = new EventEmitter();
  @Output() onRemove = new EventEmitter();

  @ViewChild(DropzoneComponent, { static: false }) componentRef?: DropzoneComponent;
  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    uploadMultiple: false,
    acceptedFiles:'image/*',
    thumbnailWidth: 150,
    thumbnailHeight: 100,
    addRemoveLinks: true,
    thumbnailMethod: 'contain',
    createImageThumbnails: true
  };

  ngOnInit(): void {
    this.config.url = this.ENDPOINT.GENERAL.UPLOAD_IMG_WITH_FOLDER_NAME + this.folderName;
    this.config.maxFiles = this.multiple ? 12 : 1;
  }

  ngOnChanges(): void {
    if (this.imgURL) {
      this.handleExistImg()
    }
  }
  private handleExistImg(){
    const dropzone = this.componentRef?.directiveRef?.dropzone()
    const mockFile = { name: "IMG", size: 250 };

    dropzone.emit( "addedfile", mockFile );
    dropzone.emit( "thumbnail", mockFile, this.baseUrlImage + this.imgURL);
    dropzone.emit( "complete", mockFile);

  }

  public onUploadInit(args: any): void {
    // console.log('onUploadInit:', args);
  }

  public onUploadError(args: any): void {
    // console.log('onUploadError:', args);
    this._toastrService.error(args[1],'error',{ toastClass: 'toast ngx-toastr', closeButton: true });
  }

  public onUploadSuccess(args: any): void {
    // console.log('onUploadSuccess:', args);
    this._toastrService.success(args[1]?.responseMessage,'success',{ toastClass: 'toast ngx-toastr', closeButton: true });
    this.onUpload.emit(args[1]?.data)
  }

  onRemovedFile(file: any): void {
    console.log('onRemovedFile:', file);
  }

}
