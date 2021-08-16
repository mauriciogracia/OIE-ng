import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ImageLayer } from '../../models/image-layer';
import { MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import { LayerService } from '../../services/layer.service';
import { DialogService } from '../../services/dialog.service';
import { BaseLayer } from '../../models/base-layer';

@Component({
  selector: 'transform-layer',
  templateUrl: './transform-layer.component.html',
  styleUrls: ['./transform-layer.component.css']
})
export class TransformLayerComponent implements OnInit {
  title = `Transform layer` ;
  fileToUpload: File | null = null;
  transformLayerForm: FormGroup | undefined ;
  
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TransformLayerComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private layerService : LayerService,
    private dialogService: DialogService,
    ) { }

  ngOnInit(): void {
    this.transformLayerForm = this.fb.group({
      scale : [1],
      rotation : [0],
    });

      let imgLayer : ImageLayer = this.data as ImageLayer;
      this.dialogService.showCurrentLayerData(imgLayer, this.transformLayerForm) ;
  }

  save() {
    let layer : BaseLayer = this.data ;
    
    this.dialogService.updateLayerWithForm(layer, this.transformLayerForm!)
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
