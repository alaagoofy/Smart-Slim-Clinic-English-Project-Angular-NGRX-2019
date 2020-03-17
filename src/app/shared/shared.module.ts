import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InnerHeaderComponent } from './inner-header/inner-header.component';
import { SaveHtmlPipe } from './pipes/saveHTML.pipe';
import { UploadAvatarComponent } from './upload-avater/upload-avatar.component';

@NgModule({
  declarations: [
    InnerHeaderComponent,
    UploadAvatarComponent,
    SaveHtmlPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InnerHeaderComponent,
    SaveHtmlPipe,
    UploadAvatarComponent
  ],
})
export class SharedModule { }
