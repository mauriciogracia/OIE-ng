import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef} from "@angular/material/dialog";
import { LayerService } from '../../services/layer.service';
import { TextLayer } from '../../models/text-layer';
import { DialogService } from '../../services/dialog.service';

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
    private dialogService : DialogService,
    ) {}

  ngOnInit(): void {
    this.addEditTextLayerForm = this.fb.group({
      text: ['sample'],
      name: [''],
      left : [{value:1, disabled: this.isEditing}],
      top : [{value:1, disabled: this.isEditing}],
    });
    
    if(this.isEditing) {
      let txtLayer : TextLayer = this.data as TextLayer;
      this.dialogService.showCurrentLayerData(txtLayer, this.addEditTextLayerForm) ;
    }
    else 
    {
      this.addEditTextLayerForm!.controls['name'].setValue(this.layerService.getSuggestedLayerName()) ;
    }
  }

  save() {
    let layer : TextLayer = (this.isEditing) ? this.data : new TextLayer() ;

    this.dialogService.updateLayerWithForm(layer, this.addEditTextLayerForm!) ;
    
    if(!this.isEditing) 
    {
      const notifyChanges = true ;
      this.layerService.addLayer(layer, notifyChanges) ;
    }
    
    this.close() ;
  }

  close() {
    this.dialogRef.close() ;
  }
}
