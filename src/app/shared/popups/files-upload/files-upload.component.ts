import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData{
  multiple: boolean;
  crop: boolean
}

@Component({
  selector: 'app-files-upload',
  templateUrl: './files-upload.component.html',
  styleUrls: ['./files-upload.component.scss']
})
export class FilesUploadComponent implements OnInit {

  isHovering: boolean;
  files: File[] = [];
  imageFile: File;
  isError: boolean;

  filesURL: string[] = [];

  constructor(private dialogRef:MatDialogRef<FilesUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data:DialogData) { }

  ngOnInit(): void {
  }

  toogleHover(event: boolean){
    this.isHovering = event;
  }

  onDrop(files:any):void{
    this.isError = false;
    if (this.data.crop && files.target.files.length > 1) {
      this.isError = true;
      return;
    }
    for (let i = 0; i < files.target.files.length; i++) {
      this.files.push(files.target.files.item(i));
    }
    console.log(files.target.files);

  }

  onUploadComplete(url: string): void{
    this.filesURL.push(url);
  }

  onComplete(): void {
    const res = this.data.multiple ? this.filesURL : this.filesURL[0];
    this.dialogRef.close(res);
  }

  onClose(): void {
      this.dialogRef.close();
  }

  onCrop(file:File):void{
    this.imageFile = null;
    this.files.push(file)
  }

}
