import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ImageLayer } from '../../models/image-layer';
import { MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import { LayerService } from '../../services/layer.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-add-edit-image-layer',
  templateUrl: './add-edit-image-layer.component.html',
  styleUrls: ['./add-edit-image-layer.component.css']
})
export class AddEditImageLayerComponent implements OnInit {
  isEditing = this.data ;
  title = `${this.isEditing ? 'Edit' : 'Add'} image layer` ;
  fileToUpload: File | null = null;
  addEditImageLayerForm: FormGroup | undefined ;
  
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEditImageLayerComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private layerService : LayerService,
    private dialogService: DialogService,
    ) { }

  ngOnInit(): void {
    this.addEditImageLayerForm = this.fb.group({
      img_src : ['http://...'],
      name: [''],
      left : [{value:1, disabled: this.isEditing}],
      top : [{value:1, disabled: this.isEditing}],
      scale : [1],
      rotation : [0],
    });

    if(this.isEditing) {
      let imgLayer : ImageLayer = this.data as ImageLayer;
      this.dialogService.showCurrentLayerData(imgLayer, this.addEditImageLayerForm) ;
    }
    else 
    {
      this.addEditImageLayerForm!.controls['name'].setValue(this.layerService.getSuggestedLayerName()) ;
    }
  }

  save() {
    let layer : ImageLayer = (this.isEditing) ? this.data : new ImageLayer() ;
    
    this.dialogService.updateLayerWithForm(layer, this.addEditImageLayerForm!)
    this.dialogService.setLayerImageOrSample(layer, this.addEditImageLayerForm!) ;
    
    if(!this.isEditing) {
      const notifyChanges = true ;
      this.layerService.addLayer(layer, notifyChanges) ;
    }
    this.layerService.updateTransform(layer) ;

    this.close() ;
  }

  close() {
    this.dialogRef.close();
  }

  handleFileInput(event:any) {
    const files = event.target.files ;
    this.fileToUpload = files.item(0) ;
  }

}
