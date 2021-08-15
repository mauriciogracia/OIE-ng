import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef} from "@angular/material/dialog";
import { LayerService } from '../../services/layer.service';
import { TextLayer } from '../../models/text-layer';
import { LayerPresenter } from '../layer-presenter/layer-presenter.component';

@Component({
  selector: 'app-add-edit-layer',
  templateUrl: './add-edit-text-layer.component.html',
  styleUrls: ['./add-edit-text-layer.component.css']
})
export class AddEditTextLayerComponent implements OnInit {
  isEditing = this.data ;
  title = `${this.isEditing ? 'Edit' : 'Add'} text layer` ;
  fileToUpload: File | null = null;
  addEditTextLayerForm: FormGroup | undefined ;
  
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEditTextLayerComponent>,
    @Inject(MAT_DIALOG_DATA) private data: TextLayer,
    private layerService : LayerService,
    private layerPresenter: LayerPresenter
    ) {}

  ngOnInit(): void {
    this.addEditTextLayerForm = this.fb.group({
      text: ['sample'],
      left : [{value:1, disabled: this.isEditing}],
      top : [{value:1, disabled: this.isEditing}],
    });
    
    if(this.isEditing) {
      let txtLayer : TextLayer = this.data as TextLayer;
      this.addEditTextLayerForm.patchValue(txtLayer) ;
      this.addEditTextLayerForm.controls['left'].setValue(txtLayer.left + txtLayer.deltaX) ;
      this.addEditTextLayerForm.controls['top'].setValue(txtLayer.top + txtLayer.deltaY) ;
    }
  }

  save() {
    let layer : TextLayer ;
    let layerId = -1 ; 

    if(this.isEditing) {
      layer = this.data ;
      layerId = layer.id ;
    }
    else {
      layer = new TextLayer() ;
    }
    //When an existing layer is selected updating the layer data is enough
    layer.name = layer.text.substring(0,10).padEnd(10,' ') ;
    layer.text = this.addEditTextLayerForm!.controls['text'].value ;
    
    if(!this.isEditing) 
    {
      const notifyChanges = true ;
      layerId = this.layerService.addLayer(layer, notifyChanges) ;
    }
    
    //since editing position is now disabled this is no longer needed
    //this.layerPresenter.positionLayer(layerId, this.addEditTextLayerForm!.controls['left'].value, this.addEditTextLayerForm!.controls['top'].value) ;
    
    this.close() ;
  }

  close() {
    this.dialogRef.close() ;
  }
}
