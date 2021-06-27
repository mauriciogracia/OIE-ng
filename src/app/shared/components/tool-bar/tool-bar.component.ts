import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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

  onAddEditImageLayerClick() {
    this.showDialog(AddEditImageLayerComponent);
  }

  onAddEditTextLayerClick() {
    this.showDialog(AddEditTextLayerComponent);
  }

  showDialog(x: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    this.dialog.open(x, dialogConfig);
  }

  anyLayerSelected() {
    return this.layerService.isAnyLayerSelected() ;
  }

  onEditLayerClick() {
    console.log("Edit selected layer (image/text)");
  }
}
