import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html'
})
export class UploadImageComponent implements OnInit {
  
  @Output() Image = new EventEmitter();
  @Output() imgBase64 = new EventEmitter();
 
  constructor(private http: Http) { }

  ngOnInit() {
  }
  
// ------------------------------------------------ Uploaded Image
  handleFileInput(file: FileList) {
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imgBase64.emit(event.target.result);
    }
    reader.readAsDataURL(file.item(0));
    const formData: FormData = new FormData();
    formData.append('Image', file.item(0), file.item(0).name);
    this.Image.emit(formData);
  }

  
}
