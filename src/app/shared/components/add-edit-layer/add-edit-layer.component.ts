import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-edit-layer',
  templateUrl: './add-edit-layer.component.html',
  styleUrls: ['./add-edit-layer.component.css']
})
export class AddEditLayerComponent implements OnInit {

  @Output() hideAddEditLayerModalEvent = new EventEmitter<boolean>();
  
  title = "Add/Edit Layer" ;
  constructor() { }

  ngOnInit(): void {
   
  }

  onClose() {
    this.hideAddEditLayerModalEvent.emit(true);
  }

  blabli() {
    console.log("add layer") ;
  }
}
