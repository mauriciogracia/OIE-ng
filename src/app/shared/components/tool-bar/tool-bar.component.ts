import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

  @Output() showAddEditLayerModalEvent = new EventEmitter<boolean>();
  
  constructor() { }

  ngOnInit(): void {
  }

  onAddEditLayerClick() {
    this.showAddEditLayerModalEvent.emit(true) ;
  }

}
