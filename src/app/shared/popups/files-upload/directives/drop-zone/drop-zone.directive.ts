import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDropZone]'
})
export class DropZoneDirective {

  @Output() dropped = new EventEmitter<FileList>();
  @Output() hovered = new EventEmitter<boolean>();

  constructor() { }

  @HostListener('drop', ['$event'])
  onDrop($event){
    $event.prevntDefault();
    this.dropped.emit($event.dataTransfer.files);
    this.hovered.emit(false);
  }

  @HostListener('dragover', ['$event'])
  onDragOver($event){
    $event.prevntDefault();
    this.hovered.emit(true);

  }

  @HostListener('dragleave', ['$event'])
  onDragLeave($event){
    $event.prevntDefault();
    this.hovered.emit(false);

  }

}
