import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ImageLayer } from '../../models/image-layer';

@Component({
  selector: 'app-add-edit-layer',
  templateUrl: './add-edit-text-layer.component.html',
  styleUrls: ['./add-edit-text-layer.component.css']
})
export class AddEditTextLayerComponent implements OnInit {
  @Output() hideAddEditLayerModalEvent = new EventEmitter<boolean>();
  @Output() addEditLayerEvent = new EventEmitter<ImageLayer>();
  
  title = "Add/Edit Layer" ;
  fileToUpload: File | null = null;
  
  addEditLayerForm = new FormGroup({
    layerName: new FormControl(''),
    leftPos : new FormControl('0'),
    topPos : new FormControl('0'),
    layerScale : new FormControl('1'),
  });

  constructor() { }

  ngOnInit(): void {
   
  }

  onClose() {
    this.hideAddEditLayerModalEvent.emit(true);
  }

  handleFileInput(event:any) {
    const files = event.target.files ;
    this.fileToUpload = files.item(0) ;
    console.log({fileToUpload:this.fileToUpload}) ;
  }

  onSubmit() {
    const layer = new ImageLayer() ;
    layer.id = -1 ;
    layer.name = this.addEditLayerForm.controls['layerName'].value ;
    layer.left = this.addEditLayerForm.controls['leftPos'].value ;
    layer.top = this.addEditLayerForm.controls['topPos'].value ;
    layer.scale = this.addEditLayerForm.controls['layerScale'].value ;
    layer.img_src = 'assets/text_02.png' ;

    this.addEditLayerEvent.emit(layer) ;
    this.hideAddEditLayerModalEvent.emit(true) ;
  }
}
