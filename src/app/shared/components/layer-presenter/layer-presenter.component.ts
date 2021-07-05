import { Component, OnInit } from '@angular/core';
import { ImageLayer } from '../../models/image-layer';
import { LayerService } from '../../services/layer.service';
import { BaseLayer, LayerType } from '../../models/base-layer';
import { TextLayer } from '../../models/text-layer';
import { CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop/drag-events';

@Component({
  selector: 'app-layer-presenter',
  templateUrl: './layer-presenter.component.html',
  styleUrls: ['./layer-presenter.component.css']
})
export class LayerPresenter implements OnInit {
  /* this is done to make the types visible to the template/html*/
  layerType = LayerType ;
  imageLayer = ImageLayer ;
  textLayer = TextLayer ;
   
  constructor(private layerService : LayerService) { }

  ngOnInit(): void {
    this.addDemoLayers() ;
  }

  addDemoLayers() {
    const imgLayer = new ImageLayer() ;
    imgLayer.img_src = "assets/back_01.jpg" ;
    imgLayer.scale = 1 ;
    imgLayer.name= "background" ;
    this.layerService.addLayer(imgLayer) ;

    for(let i=1; i < 22 ; i++) {
      const x = new TextLayer();
      x.text = "Text Layer: - }";
      x.positionLayer(100+i*15,100+i*15) ;
      x.name = "textLayer" ;
      this.layerService.addLayer(x) ;
    }
  }

  getLayers() : BaseLayer[] {
    this.layerService.logLayers() ;
    return this.layerService.getVisibleLayers() ;
  }

  selectLayerByClick(layer: BaseLayer) {
    this.layerService.setSelectedLayer(layer) ;
  }

  layerDragStarted($event: CdkDragStart) {
    let layerId = +$event.source.element.nativeElement.id ;
    this.layerService.setSelectedLayerById(layerId) ;
  }

  // https://stackoverflow.com/questions/54449939/how-to-get-the-position-after-drop-with-cdkdrag
  // https://stackoverflow.com/questions/22091733/dynamically-transform-in-css-using-ng-style
  layerDragEnded($event: CdkDragEnd) {
    let layerId = +$event.source.element.nativeElement.id ;
    let layer = this.layerService.getLayerById(layerId)! ;
    let position = $event.source.getFreeDragPosition() ;

    console.log({position:position}) ;

    layer.moveLayer(position.x, position.y) ;

    console.log({layerDragEnded:layer}) ;
  }
}
