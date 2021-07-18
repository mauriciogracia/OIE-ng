import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ImageLayer } from '../../models/image-layer';
import { MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import { LayerService } from '../../services/layer.service';

@Component({
  selector: 'app-add-edit-image-layer',
  templateUrl: './add-edit-image-layer.component.html',
  styleUrls: ['./add-edit-image-layer.component.css']
})
export class AddEditImageLayerComponent implements OnInit {
  title = `${this.data ? 'Edit' : 'Add'} image layer` ;
  fileToUpload: File | null = null;
  addEditImageLayerForm: FormGroup | undefined ;
 

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEditImageLayerComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private layerService : LayerService
    ) { }

  ngOnInit(): void {
    this.addEditImageLayerForm = this.fb.group({
      img_src : ['http://...'],
      name: [''],
      left : [1],
      top : [1],
      scale : [1],
      rotation : [0],
    });

    if(this.data) {
      let imgLayer : ImageLayer = this.data as ImageLayer;
      this.addEditImageLayerForm.patchValue(imgLayer) ;
      this.addEditImageLayerForm!.controls['left'].setValue(imgLayer.left + imgLayer.deltaX) ;
      this.addEditImageLayerForm!.controls['top'].setValue(imgLayer.top + imgLayer.deltaY) ;
    }
    else 
    {
      this.addEditImageLayerForm!.controls['name'].setValue(this.layerService.getSuggestedLayerName()) ;
    }
  }

  save() {
    let layer : ImageLayer ;
    let layerId = -1 ;

    if(this.data) {
      layer = this.data ;
      layerId = layer.id ;
    }
    else {
      layer = new ImageLayer() ;
    }
    //When an existing layer is selected updating the layer data is enough
    layer.name = this.addEditImageLayerForm!.controls['name'].value ;
    layer.scale = this.addEditImageLayerForm!.controls['scale'].value ;
    layer.rotation = this.addEditImageLayerForm!.controls['rotation'].value ;

    let imgURL:string = this.addEditImageLayerForm!.controls['img_src'].value ;

    if(imgURL){
      layer.img_src = imgURL ;
    }
    else {
      layer.img_src = 'assets/text_02.png' ;
    }

    if(!this.data) {
      const notifyChanges = true ;
      layerId = this.layerService.addLayer(layer, notifyChanges) ;
    }

    this.layerService.positionLayer(layerId, this.addEditImageLayerForm!.controls['left'].value, this.addEditImageLayerForm!.controls['top'].value) ;
   
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
