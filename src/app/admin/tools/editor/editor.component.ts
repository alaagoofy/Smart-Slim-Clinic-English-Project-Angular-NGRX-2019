import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, TableService, QuickToolbarService }
  from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, TableService, QuickToolbarService]
})
export class EditorComponent implements OnInit {

  @Input() dbValue: string;
  @Output() editorValue = new EventEmitter();

  value: string = ``;
  tools: object = {
    items: ['Undo', 'Redo', '|',
      'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
      'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
      'SubScript', 'SuperScript', '|',
      'LowerCase', 'UpperCase', '|',
      'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
      'Indent', 'Outdent', '|', 'CreateLink', 'CreateTable',
      'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen']
  };
  quickTools: object = {
    image: [
      'Replace', 'Align', 'Caption', 'Remove', 'InsertLink', '-', 'Display', 'AltText', 'Dimension']
  };

  constructor() { }

  ngOnInit() {
    if (this.dbValue) {
      this.value = this.dbValue;
    }
  }

  getVal(value) {
    this.value = value;
    this.editorValue.emit(this.value);
  }

}
