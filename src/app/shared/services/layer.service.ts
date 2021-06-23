import { Injectable } from '@angular/core';
import { ImageLayer } from '../models/image-layer';

@Injectable({
  providedIn: 'root'
})

@Injectable()

export class LayerService {
  private imageLayers: ImageLayer[] = [];

  constructor() { }

  getLayers() : ImageLayer[] {
    return this.imageLayers ;
  }

  getNewImageLayerIndex() {
    return (this.imageLayers.length+1) ;
  }

  getNewImageLayerId() {
    return Math.max(...this.imageLayers.map(x => x.id),0)+1 ;
  }

  addImageLayer(imgLayer: ImageLayer) {
    imgLayer.z_index = this.getNewImageLayerIndex() ;
    imgLayer.id = this.getNewImageLayerId() ;
    this.imageLayers.push(imgLayer) ;
  }
}
