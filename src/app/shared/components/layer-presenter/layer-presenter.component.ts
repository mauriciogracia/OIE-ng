import { Component, OnInit } from '@angular/core';
import { ImageLayer } from '../../models/image-layer';
import { LayerService } from '../../services/layer.service';

@Component({
  selector: 'app-image-layers',
  templateUrl: './layer-presenter.component.html',
  styleUrls: ['./layer-presenter.component.css']
})
export class LayerPresenter implements OnInit {
  constructor(private layerService : LayerService) { }

  ngOnInit(): void {
    const imgLayer = new ImageLayer() ;
    imgLayer.left = 0 ;
    imgLayer.top = 0 ;
    imgLayer.img_src = "assets/back_01.jpg" ;
    imgLayer.scale = 1 ;

    this.layerService.addImageLayer(imgLayer) ;
  }
  
  getLayers() : ImageLayer[] {
    return this.layerService.getLayers() ;
  }

  

}
