import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseLayer } from '../models/base-layer';

@Injectable({
  providedIn: 'root'
})

export class LayerService {
  public version = "2021.07.17 - 10:09 pm" ;

  private layers: BaseLayer[] = [];
  private selectedLayerId = -1;
  private allLayersObs$: BehaviorSubject<BaseLayer[]> = new BehaviorSubject(this.layers);

  constructor() { }

  positionLayer(layerId: number, newLeft: number, newTop: number) {
    let layer = this.getLayerById(layerId) ;

    if(layer) {
      layer.left = newLeft ;
      layer.top = newTop ;
      layer.deltaX = 0 ;
      layer.deltaY = 0 ;
    }
  }

  moveLayer(layerId: number, dx: number, dy: number) {
    let layer = this.getLayerById(layerId) ;

    if(layer) {
      layer.deltaX = dx ;
      layer.deltaY = dy ; 
    }

    console.log({moveLayer: this.getLayerById(layerId)});
  }

  hasLayers() {
    return (this.layers.length > 0) ;
  }
  
  notifyLayerChanges() {
    this.allLayersObs$.next(this.layers) ;
  }

  clearLayers(notifyChanges: boolean) {
    this.layers = [] ;
    
    if(notifyChanges) {
      this.notifyLayerChanges() ;
    }
  }

  getAllLayersObs() : Observable<BaseLayer[]> {
    return this.allLayersObs$.asObservable() ;
  }

  getCurrentVisibleLayers() 
  {
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

  addLayer(layer: BaseLayer, notifyChanges: boolean): number {
    layer.z_index = this.getNewLayerDepthIndex() ;
    layer.id = this.getNewLayerId() ;
    this.layers.push(layer) ;
    this.setSelectedLayer(layer, notifyChanges) ;

    return layer.id ;
  }

  getLayerById(layerId: number): BaseLayer | undefined {
    return this.layers.find(l =>l.id === layerId) ;
  }

  anyLayerSelected() {
    return (this.selectedLayerId !== -1) ;
  }

  unselectPreviousLayer(notifyChanges: boolean) {
    const layer = this.getSelectedLayer() ;

    if(layer) {
      layer.selected = false ;
      this.selectedLayerId = -1;
      
      if(notifyChanges) {
        this.notifyLayerChanges() ;
      }
    }
  }

  isAnyLayerSelected() {
    return (this.getSelectedLayer() !== undefined) ;
  }
  
  getSelectedLayer() {
    return this.getLayerById(this.selectedLayerId) ;
  }

  setSelectedLayerById(layerId: number, notifyChanges: boolean) {
    this.setSelectedLayer(this.getLayerById(layerId), notifyChanges) ;
  }

  setSelectedLayer(layer: BaseLayer| undefined, notifyChanges: boolean) {
    if(layer) {
      this.unselectPreviousLayer(false) ;
      layer.selected = true ;
      this.selectedLayerId = layer.id ;

      if(notifyChanges) {
        this.notifyLayerChanges() ;
      }
    }
  }

  changeOrder(prevIndex: number, newIndex: number, notifyChanges: boolean) {
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
      
      if(notifyChanges) {
        this.notifyLayerChanges() ;
      }
    }
  }

  toggleLayerVisibility(layer: BaseLayer, notifyChanges: boolean) {
    
    layer.visible = !layer.visible ;

    if((!layer.visible) && (layer.id === this.getSelectedLayer()?.id))
    {
      this.unselectPreviousLayer(notifyChanges) ;
    }
    else if(notifyChanges) {
      this.notifyLayerChanges() ;
    }
  }

  getIndexOfLayer(layer: BaseLayer) {
    return this.layers.findIndex(l => l.id === layer.id);
  }

  removeLayer(layer: BaseLayer, notifyChanges: boolean) {
    let indexOfLayer = this.getIndexOfLayer(layer);
    if(indexOfLayer >= 0) {
      this.layers.splice(indexOfLayer,1) ;
      if(notifyChanges) {
        this.notifyLayerChanges() ;
      }
    }
  }

  duplicateSelectedLayer(notifyChanges: boolean) {
    let newLayer = new BaseLayer() ;
    Object.assign(newLayer, this.getSelectedLayer());

    this.addLayer(newLayer, notifyChanges) ;
  }

  logLayers() {
    this.layers.forEach(x => console.log(x)) ;
  }
}
