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
    this.setSelectedLayer(layer.id) ;
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

  isAnyLayerSelected() {
    return (this.getSelectedLayer() !== undefined) ;
  }
  
  getSelectedLayer() {
    return this.getLayerById(this.selectedLayerId) ;
  }

  getLayerIndexById(layerId: number) {
    return this.layers.findIndex(l => l.id === layerId) ;
  }

  setSelectedLayer(layerId: number) {
    const layer = this.getLayerById(layerId) ;

    this.unselectPreviousLayer() ;

    if(layer) {
      layer.selected = true ;
      this.selectedLayerId = layerId ;
    }
  }

  changeOrder(prevIndex: number, newIndex: number) {
    if(prevIndex != newIndex) {
      let delta = (prevIndex > newIndex) ? 1 : -1 ;
      let i = Math.min(newIndex, prevIndex) ;
      const max = Math.max(prevIndex, newIndex) ;

      const temp = this.layers[prevIndex].z_index ;
      this.layers[prevIndex].z_index = this.layers[newIndex].z_index ;
      this.layers[newIndex].z_index = temp ;

      for(i = i + 1 ; i < max; i++) {
        this.layers[i].z_index += delta ;
      }
      //Keep layers sorted by z_index 
      this.layers = this.layers.sort((l1,l2) => (l1.z_index - l2.z_index)) ;
    }
  }

  logLayers() {
    this.layers.forEach(x => console.log(x)) ;
  }
}
