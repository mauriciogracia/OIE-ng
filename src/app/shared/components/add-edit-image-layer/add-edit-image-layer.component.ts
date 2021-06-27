import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ImageLayer } from '../../models/image-layer';
import { MatDialogRef} from "@angular/material/dialog";
import { LayerService } from '../../services/layer.service';

@Component({
  selector: 'app-add-edit-image-layer',
  templateUrl: './add-edit-image-layer.component.html',
  styleUrls: ['./add-edit-image-layer.component.css']
})
export class AddEditImageLayerComponent implements OnInit {
  title = "Add/Edit Layer" ;
  fileToUpload: File | null = null;
  
  addEditLayerForm = new FormGroup({
    layerName: new FormControl(''),
    leftPos : new FormControl('0'),
    topPos : new FormControl('0'),
    layerScale : new FormControl('1'),
  });

  constructor(
    private dialogRef: MatDialogRef<AddEditImageLayerComponent>,
    private layerService : LayerService
    ) { }

  ngOnInit(): void {
   
  }

  save() {
    //TODO
    //this.dialogRef.close(this.form.value);
    const layer = new ImageLayer() ;
    layer.id = -1 ;
    layer.name = this.addEditLayerForm.controls['layerName'].value ;
    layer.left = this.addEditLayerForm.controls['leftPos'].value ;
    layer.top = this.addEditLayerForm.controls['topPos'].value ;
    layer.scale = this.addEditLayerForm.controls['layerScale'].value ;
    layer.img_src = 'assets/text_02.png' ;

    this.layerService.addLayer(layer) ;
    this.close() ;
  }

  close() {
    this.dialogRef.close();
  }

  handleFileInput(event:any) {
    const files = event.target.files ;
    this.fileToUpload = files.item(0) ;
    console.log({fileToUpload:this.fileToUpload}) ;
  }

}
