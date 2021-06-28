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
      text: [],
      leftPos : [],
      topPos : [],
    });
    this.addEditTextLayerForm.patchValue(this.data) ;
  }

  save() {
    const txt = this.addEditTextLayerForm!.controls['text'].value ;
    const layer = new TextLayer(txt) ;
    layer.id = -1 ;
    layer.name = txt ;
    layer.left = this.addEditTextLayerForm!.controls['leftPos'].value ;
    layer.top = this.addEditTextLayerForm!.controls['topPos'].value ;
    
    this.layerService.addLayer(layer) ;
    this.close() ;
  }

  close() {
    this.dialogRef.close() ;
  }
}
