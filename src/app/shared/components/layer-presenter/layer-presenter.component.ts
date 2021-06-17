import { Component, OnInit } from '@angular/core';
import { ImageLayer } from '../../models/image-layer';

@Component({
  selector: 'app-image-layers',
  templateUrl: './layer-presenter.component.html',
  styleUrls: ['./layer-presenter.component.css']
})
export class LayerPresenter implements OnInit {
  imageLayers: ImageLayer[] = [];

  constructor() { }

  ngOnInit(): void {
    const imgLayer = new ImageLayer() ;
    imgLayer.left = 0 ;
    imgLayer.top = 0 ;
    imgLayer.img_src = "assets/back_01.jpg" ;
    imgLayer.scale = 1 ;

    this.addImageLayer(imgLayer) ;
    /*
    this.addImageLayer(10,30,"assets/text_02.png",0.5) ;
    this.addImageLayer(10,30,"assets/text_02.png",1) ;
    this.addImageLayer(10,30,"assets/text_02.png",1.5) ;
    this.addImageLayer(10,30,"assets/text_02.png",2) ;
    */
  }

  getNewImageLayerIndex() {
    return (this.imageLayers.length+1) ;
  }

  addImageLayer(imgLayer: ImageLayer) {
    imgLayer.z_index = this.getNewImageLayerIndex() ;
    this.imageLayers.push(imgLayer) ;
  }

}
