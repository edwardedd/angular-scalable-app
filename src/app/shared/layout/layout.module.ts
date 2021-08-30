import { UserPhotoModule } from './user-photo/user-photo.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserPhotoModule
  ],
  exports:[
    UserPhotoModule
  ]
})
export class LayoutModule { }
