import { Injectable } from '@angular/core';
import { BaseLayer } from '../models/base-layer';

@Injectable({
  providedIn: 'root'
})

export class LayerService {
  private layers: BaseLayer[] = [];
  private selectedLayerId = -1;
  public version = "2021.07.11 - 13:10 pm" ;

  constructor() { }

  setLayers(layers: BaseLayer[]) {
    this.layers = layers ;
  }

  getLayers() : BaseLayer[] {
    return this.layers ;
  }

  hasLayers() {
    return (this.layers.length > 0) ;
  }
  
  clearLayers() {
    this.layers = [] ;
  }

  getVisibleLayers() : BaseLayer[] {
    return this.layers.filter(l => l.visible) ;
  }

  private getNewLayerDepthIndex() {
    return (this.layers.length+1) ;
  }

  getSuggestedLayerName() {
    let max = Math.max(...this.layers.map(x => x.id),0)+1 ;

    return `Layer_${this.digits(''+max,3)}` ;
  }

  //TODO if more methods that are utilitary appear consider creating a UtilService and move this there
  private digits(value:string, padding:number) {
    var zeroes = new Array(padding+1).join("0");
    return (zeroes + value).slice(-padding);
  }

  private getNewLayerId() {
    return Math.max(...this.layers.map(x => x.id),0)+1 ;
  }

  addLayer(layer: BaseLayer) {
    layer.z_index = this.getNewLayerDepthIndex() ;
    layer.id = this.getNewLayerId() ;
    this.layers.push(layer) ;
    this.setSelectedLayer(layer) ;
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

  setSelectedLayerById(layerId: number) {
    this.setSelectedLayer(this.getLayerById(layerId)) ;
  }

  setSelectedLayer(layer: BaseLayer| undefined) {

    this.unselectPreviousLayer() ;

    if(layer) {
      layer.selected = true ;
      this.selectedLayerId = layer.id ;
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

  toggleLayerVisibility(layer: BaseLayer) {
    
    layer.visible = !layer.visible ;

    if((!layer.visible) && (layer.id === this.getSelectedLayer()?.id))
    {
      this.unselectPreviousLayer() ;
    }
    
  }

  getIndexOfLayer(layer: BaseLayer) {
    return this.layers.findIndex(l => l.id === layer.id);
  }

  removeLayer(layer: BaseLayer) {
    let indexOfLayer = this.getIndexOfLayer(layer);
    if(indexOfLayer >= 0) {
      this.layers.splice(indexOfLayer,1) ;
    }
  }

  duplicateSelectedLayer() {
    let newLayer = new BaseLayer() ;
    Object.assign(newLayer, this.getSelectedLayer());
    this.addLayer(newLayer) ;
  }

  logLayers() {
    this.layers.forEach(x => console.log(x)) ;
  }
}
