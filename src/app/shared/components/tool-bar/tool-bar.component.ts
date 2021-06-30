import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ImageLayer } from '../../models/image-layer';
import { TextLayer } from '../../models/text-layer';
import { LayerService } from '../../services/layer.service';
import { AddEditImageLayerComponent } from '../add-edit-image-layer/add-edit-image-layer.component';
import { AddEditTextLayerComponent } from '../add-edit-text-layer/add-edit-text-layer.component';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private layerService: LayerService
    ) { }

  ngOnInit(): void {
  }

  onAddImageLayer() {
    this.showDialog(AddEditImageLayerComponent, null);
  }

  onAddTextLayer() {
    this.showDialog(AddEditTextLayerComponent, null);
  }

  showDialog(x: any, data: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    if(data !== null) {
      dialogConfig.data = data ;
    }

    this.dialog.open(x, dialogConfig);
  }

  anyLayerSelected() {
    return this.layerService.isAnyLayerSelected() ;
  }

  onEditLayerC() {
    const layer = this.layerService.getSelectedLayer() ;

    if(layer) {
      if(layer instanceof ImageLayer) {
        console.log("Edit selected layer (image)");
        this.showDialog(AddEditTextLayerComponent,(layer as ImageLayer)) ;
      }
      else if (layer instanceof TextLayer){
        this.showDialog(AddEditTextLayerComponent,(layer as TextLayer)) ;
      }
      else {
        console.log("New type of layer !?");
      }
    }
    
    
  }
}
