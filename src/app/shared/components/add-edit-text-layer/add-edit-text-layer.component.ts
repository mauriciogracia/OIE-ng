import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef} from "@angular/material/dialog";
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
  
  addEditLayerForm = new FormGroup({
    text: new FormControl('sample'),
    leftPos : new FormControl('0'),
    topPos : new FormControl('0'),
  });

  constructor(
    private dialogRef: MatDialogRef<AddEditTextLayerComponent>,
    private layerService : LayerService
    ) { }

  ngOnInit(): void {
   
  }

  save() {
    const txt = this.addEditLayerForm.controls['text'].value ;
    const layer = new TextLayer(txt) ;
    layer.id = -1 ;
    layer.name = txt ;
    layer.left = this.addEditLayerForm.controls['leftPos'].value ;
    layer.top = this.addEditLayerForm.controls['topPos'].value ;
    
    this.layerService.addLayer(layer) ;
    this.close() ;
  }

  close() {
    this.dialogRef.close() ;
  }
}
