import { Injectable } from '@angular/core';
import { BaseLayer, LayerType } from '../models/base-layer';
import { ImageLayer } from '../models/image-layer';

@Injectable({
  providedIn: 'root'
})

export class LayerService {
  private layers: BaseLayer[] = [];
  private selectedLayerId = -1;

  constructor() { }

  getLayers() : BaseLayer[] {
    return this.layers ;
  }

  getNewLayerDepthIndex() {
    return (this.layers.length+1) ;
  }

  getNewLayerId() {
    return Math.max(...this.layers.map(x => x.id),0)+1 ;
  }

  addLayer(layer: BaseLayer) {
    layer.z_index = this.getNewLayerDepthIndex() ;
    layer.id = this.getNewLayerId() ;
    this.layers.push(layer) ;
  }

  getLayerById(layerId: number): BaseLayer | undefined {
    return this.layers.find(l =>l.id === layerId) ;
  }

  anyLayerSelected() {
    return (this.selectedLayerId !== -1) ;
  }

  unselectPreviousLayer() {
    const layer = this.getSelectedLayer() ;

    if(layer) {
      layer.selected = false ;
      this.selectedLayerId = -1;
    }
  }

  getSelectedLayer() {
    return this.getLayerById(this.selectedLayerId) ;
  }

  setSelectedLayer(layerId: number) {
    const layer = this.getLayerById(layerId) ;

    this.unselectPreviousLayer() ;

    if(layer) {
      layer.selected = true ;
      this.selectedLayerId = layerId ;
    }
  }
}
