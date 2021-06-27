import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddEditLayerComponent } from '../add-edit-layer/add-edit-layer.component';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

  @Output() showAddEditLayerModalEvent = new EventEmitter<boolean>();
  
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onAddEditLayerClick() {
    this.showAddEditLayerModalEvent.emit(true) ;
  }
  onAddEditTextLayerClick() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    this.dialog.open(AddEditLayerComponent, dialogConfig);
    console.log("onAddEditTextLayerClick") ;
  }
}
