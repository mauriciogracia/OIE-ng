import { Injectable } from '@angular/core';
import { BaseLayer, LayerType } from '../models/base-layer';
import { ImageLayer } from '../models/image-layer';

@Injectable({
  providedIn: 'root'
})

export class LayerService {
  private layers: BaseLayer[] = [];

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
}
