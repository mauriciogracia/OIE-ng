import { Component, ViewChild } from '@angular/core';
import { LayerPresenter } from './shared/components/layer-presenter/layer-presenter.component';
import { ImageLayer } from './shared/models/image-layer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OIE-ng';
  isAddEditLayerVisisble = false ;
  @ViewChild (LayerPresenter) layerPresenter! : LayerPresenter ;

  showAddEditLayerModal() {
    this.isAddEditLayerVisisble = true ;
  }

  hideAddEditLayerModal() {
    this.isAddEditLayerVisisble = false ;
  }

  handleAddEditLayerEvent(imgLayer:ImageLayer) {
    this.layerPresenter.addImageLayer(imgLayer)
  }
}
