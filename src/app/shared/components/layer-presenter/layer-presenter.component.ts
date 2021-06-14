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
    this.addImageLayer(0,0,"assets/back_01.jpg",1) ;
    this.addImageLayer(10,30,"assets/text_02.png",0.5) ;
    this.addImageLayer(10,30,"assets/text_02.png",1) ;
    this.addImageLayer(10,30,"assets/text_02.png",1.5) ;
    this.addImageLayer(10,30,"assets/text_02.png",2) ;
  }

  getNewImageLayerIndex() {
    return (this.imageLayers.length+1) ;
  }

  addImageLayer(x: number, y: number, src: string, scale: number ) {
    const imgLayer = new ImageLayer(x,y,src, scale, this.getNewImageLayerIndex()) ;
    this.imageLayers.push(imgLayer) ;
  }

}
