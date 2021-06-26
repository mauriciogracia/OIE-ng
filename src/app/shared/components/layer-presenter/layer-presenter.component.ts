import { Component, OnInit } from '@angular/core';
import { ImageLayer } from '../../models/image-layer';
import { LayerService } from '../../services/layer.service';
import { BaseLayer, LayerType } from '../../models/base-layer';
import { TextLayer } from '../../models/text-layer';

@Component({
  selector: 'app-layer-presenter',
  templateUrl: './layer-presenter.component.html',
  styleUrls: ['./layer-presenter.component.css']
})
export class LayerPresenter implements OnInit {
  /* make the types visible to the template/html*/
  layerType = LayerType ;
  imageLayer = ImageLayer ;
  textLayer = TextLayer ;
   
  constructor(private layerService : LayerService) { }

  ngOnInit(): void {
    const imgLayer = new ImageLayer() ;
    imgLayer.img_src = "assets/back_01.jpg" ;
    imgLayer.scale = 1 ;
    imgLayer.name= "background" ;
    this.layerService.addLayer(imgLayer) ;

    const x = new TextLayer("prueba");
    x.name = "textLayer" ;
    this.layerService.addLayer(x) ;
  }

  getLayers() : BaseLayer[] {
    return this.layerService.getLayers() ;
  }

  

}
