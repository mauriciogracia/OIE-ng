import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ImageLayer } from '../../models/image-layer';
import { MatDialogRef} from "@angular/material/dialog";
import { LayerService } from '../../services/layer.service';

@Component({
  selector: 'app-add-edit-layer',
  templateUrl: './add-edit-text-layer.component.html',
  styleUrls: ['./add-edit-text-layer.component.css']
})
export class AddEditTextLayerComponent implements OnInit {
  
  title = "Add/Edit Text Layer" ;
  fileToUpload: File | null = null;
  
  addEditLayerForm = new FormGroup({
    layerName: new FormControl(''),
    leftPos : new FormControl('0'),
    topPos : new FormControl('0'),
    layerScale : new FormControl('1'),
  });

  constructor(
    private dialogRef: MatDialogRef<AddEditTextLayerComponent>,
    private layerService : LayerService
    ) { }

  ngOnInit(): void {
   
  }

  save() {
    //TODO fix/connect logic below  on_Submit() {
    /*
    const layer = new ImageLayer() ;
    layer.id = -1 ;
    layer.name = this.addEditLayerForm.controls['layerName'].value ;
    layer.left = this.addEditLayerForm.controls['leftPos'].value ;
    layer.top = this.addEditLayerForm.controls['topPos'].value ;
    layer.scale = this.addEditLayerForm.controls['layerScale'].value ;
    layer.img_src = 'assets/text_02.png' ;
    */
    console.log("not implemented") ;
    this.close() ;
  }

  close() {
    this.dialogRef.close() ;
  }
}
