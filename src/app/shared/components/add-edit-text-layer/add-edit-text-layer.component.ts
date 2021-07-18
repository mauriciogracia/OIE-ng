import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef} from "@angular/material/dialog";
import { LayerService } from '../../services/layer.service';
import { TextLayer } from '../../models/text-layer';

@Component({
  selector: 'app-add-edit-layer',
  templateUrl: './add-edit-text-layer.component.html',
  styleUrls: ['./add-edit-text-layer.component.css']
})
export class AddEditTextLayerComponent implements OnInit {
  title = `${this.data ? 'Edit' : 'Add'} text layer` ;
  fileToUpload: File | null = null;
  addEditTextLayerForm: FormGroup | undefined ;
  
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEditTextLayerComponent>,
    @Inject(MAT_DIALOG_DATA) private data: TextLayer,
    private layerService : LayerService
    ) {}

  ngOnInit(): void {
    this.addEditTextLayerForm = this.fb.group({
      text: ['sample'],
      left : [1],
      top : [1],
    });
    
    if(this.data) {
      let txtLayer : TextLayer = this.data as TextLayer;
      this.addEditTextLayerForm.patchValue(txtLayer) ;
      this.addEditTextLayerForm.controls['left'].setValue(txtLayer.left + txtLayer.deltaX) ;
      this.addEditTextLayerForm.controls['top'].setValue(txtLayer.top + txtLayer.deltaY) ;
    }
  }

  save() {
    let layer : TextLayer ;
    let layerId = -1 ; 

    if(this.data) {
      layer = this.data ;
      layerId = layer.id ;
    }
    else {
      layer = new TextLayer() ;
    }
    //When an existing layer is selected updating the layer data is enough
    layer.name = layer.text.substring(0,10).padEnd(10,' ') ;
    layer.text = this.addEditTextLayerForm!.controls['text'].value ;
    
    if(!this.data) 
    {
      const notifyChanges = true ;
      layerId = this.layerService.addLayer(layer, notifyChanges) ;
    }
    
    this.layerService.positionLayer(layerId, this.addEditTextLayerForm!.controls['left'].value, this.addEditTextLayerForm!.controls['top'].value) ;
    
    this.close() ;
  }

  close() {
    this.dialogRef.close() ;
  }
}
