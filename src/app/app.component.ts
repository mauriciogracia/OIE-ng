import { Component, ViewChild } from '@angular/core';
import { LayerPresenter } from './shared/components/layer-presenter/layer-presenter.component';
import { ImageLayer } from './shared/models/image-layer';
import { LayerService } from './shared/services/layer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OIE-ng';
  isAddEditLayerVisisble = false ;
  @ViewChild (LayerPresenter) layerPresenter! : LayerPresenter ;

  constructor(private layerService : LayerService) {}

  showAddEditLayerModal() {
    this.isAddEditLayerVisisble = true ;
  }

  hideAddEditLayerModal() {
    this.isAddEditLayerVisisble = false ;
  }

  handleAddEditLayerEvent(imgLayer:ImageLayer) {
    this.layerService.addImageLayer(imgLayer)
  }
}
