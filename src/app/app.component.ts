import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OIE-ng';
  isAddEditLayerVisisble = false ;

  showAddEditLayerModal() {
    this.isAddEditLayerVisisble = true ;
  }

  hideAddEditLayerModal() {
    this.isAddEditLayerVisisble = false ;
  }
}
