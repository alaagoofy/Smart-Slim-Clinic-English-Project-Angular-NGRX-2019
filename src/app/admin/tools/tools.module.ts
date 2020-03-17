import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatTooltipModule} from '@angular/material/tooltip';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { EditorComponent } from './editor/editor.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { InnerHeaderComponent } from './inner-header/inner-header.component';

@NgModule({
  declarations: [
    EditorComponent,
    UploadImageComponent,
    InnerHeaderComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    RichTextEditorAllModule,
    MatTooltipModule
  ],
  exports: [
    EditorComponent,
    UploadImageComponent,
    InnerHeaderComponent
  ]
})
export class ToolsModule { }
