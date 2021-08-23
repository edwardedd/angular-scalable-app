import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { ImageCropperModule } from 'ngx-image-cropper';

import { FilesUploadDirective } from './files-upload.directive';
import { FilesUploadComponent } from './files-upload.component';
import { DropZoneDirective } from './directives/drop-zone/drop-zone.directive';
import { UploadComponent } from './components/upload/upload.component';
// import { DropZoneDirective } from './directives/drop-zone/drop-zone.directive';
// import { UploadComponent } from './components/upload/upload.component';
import { FileSizePipe } from './pipes/file-size/file-size.pipe';
import { CropperComponent } from './components/cropper/cropper.component';
// import { CropperComponent } from './components/cropper/cropper.component';



@NgModule({
  declarations: [
    FilesUploadComponent,
    FilesUploadDirective,
    DropZoneDirective,
    UploadComponent,
    FileSizePipe,
    CropperComponent
  ],
  imports: [
    MatDialogModule,
    ImageCropperModule,
    CommonModule
  ],
  exports: [
    FilesUploadDirective
  ]
})
export class FilesUploadModule { }
