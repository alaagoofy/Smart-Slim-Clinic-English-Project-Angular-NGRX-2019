import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upload-avatar',
  templateUrl: './upload-avatar.component.html'
})
export class UploadAvatarComponent implements OnInit {
  
  @Output() Image = new EventEmitter();
  @Output() imgBase64 = new EventEmitter();
 
  constructor() { }

  ngOnInit() {
  }
  
// ------------------------------------------------ Uploaded Image
  handleFileInput(file: FileList) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imgBase64.emit(event.target.result);
    }
    reader.readAsDataURL(file.item(0));
    const formData: FormData = new FormData();
    formData.append('Image', file.item(0), file.item(0).name);
    this.Image.emit(formData);
  }

  
}
