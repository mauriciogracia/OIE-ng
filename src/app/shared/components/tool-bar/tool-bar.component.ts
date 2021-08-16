import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BaseLayer, LayerType } from '../../models/base-layer';
import { Design } from '../../models/design';
import { ImageLayer } from '../../models/image-layer';
import { TextLayer } from '../../models/text-layer';
import { FileService } from '../../services/file.service';
import { LayerService } from '../../services/layer.service';
import { AddEditImageLayerComponent } from '../add-edit-image-layer/add-edit-image-layer.component';
import { AddEditTextLayerComponent } from '../add-edit-text-layer/add-edit-text-layer.component';
import { TransformLayerComponent } from '../transform-layer/transform-layer.component';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private layerService: LayerService,
    private fileService: FileService
    ) { }

  ngOnInit(): void {
  }

  version() {
    return this.layerService.version ;
  }
  
  onNewDesign() {
    //TODO confirmation dialog when changes have been made that are not saved/exported. see hasPendingChanges in FileService
    const notifyChanges = true ;
    this.layerService.clearLayers(notifyChanges) ;
    this.fileService.currentDesign = new Design({name:"demo.oie"}) ;
  }

  onFileUpload() {
    window.alert("File upload and display") ;
  }

  onFileDownload() {
    //TODO this.fileService.exportToImage() ;

    this.fileService.exportToHTML() ;
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

    dialogConfig.panelClass = 'custom-dialog-container' ;

    let diagRef = this.dialog.open(x, dialogConfig);
    diagRef.updatePosition({left: '50px', top: '20px'}) ;
  }

  anyLayerSelected() {
    return this.layerService.isAnyLayerSelected() ;
  }

  onEditLayer() {
    const layer = this.layerService.getSelectedLayer() ;

    if(layer) {
      if(layer.type === LayerType.Image) {
        this.showDialog(AddEditImageLayerComponent,(layer as ImageLayer)) ;
      }
      else if (layer.type === LayerType.Text){
        this.showDialog(AddEditTextLayerComponent,(layer as TextLayer)) ;
      }
      else {
        console.log({newtypeOfLayer:layer}) ;
      }
    }
  }

  onTransformLayer() {
    const layer = this.layerService.getSelectedLayer() ;

    if(layer) {
      this.showDialog(TransformLayerComponent,(layer as BaseLayer)) ;
    }
  }

  onCopyLayer() {
    const notifyChanges = true ;
    this.layerService.duplicateSelectedLayer(notifyChanges) ;
  }

  onSettings() {
    window.alert("settings") ;
  }
}
