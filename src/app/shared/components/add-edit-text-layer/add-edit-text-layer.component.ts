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
  title = "Add/Edit Text Layer" ;
  fileToUpload: File | null = null;
  addEditTextLayerForm: FormGroup | undefined ;
  
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEditTextLayerComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private layerService : LayerService
    ) {}

  ngOnInit(): void {
    this.addEditTextLayerForm = this.fb.group({
      text: ['sample'],
      left : [1],
      top : [1],
    });
    
    if(this.data) {
      this.addEditTextLayerForm.patchValue(this.data) ;
    }
  }

  save() {
    let layer : TextLayer ;

    console.log({data:this.data});

    if(this.data) {
      layer = this.data ;
    }
    else 
    {
      layer = new TextLayer() ;
    }
    //When an existing layer is selected updating the layer data is enough
    layer.text = this.addEditTextLayerForm!.controls['text'].value ;
    layer.name = layer.text.substring(0,10) ;
    layer.left = this.addEditTextLayerForm!.controls['left'].value ;
    layer.top = this.addEditTextLayerForm!.controls['top'].value ;
    
    if(!this.data) 
    {
      this.layerService.addLayer(layer) ;
    }
    
    this.close() ;
  }

  close() {
    this.dialogRef.close() ;
  }
}
