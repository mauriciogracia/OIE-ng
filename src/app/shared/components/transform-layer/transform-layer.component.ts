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

    this.dialogService.showCurrentData(this.data, this.transformLayerForm) ;
  }

  save() {
    this.dialogService.updateLayerWithForm(this.data, this.transformLayerForm!)
    this.layerService.updateTransform(this.data) ;

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
