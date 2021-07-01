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
    const imgLayer = new ImageLayer() ;
    imgLayer.img_src = "assets/back_01.jpg" ;
    imgLayer.scale = 1 ;
    imgLayer.name= "background" ;
    this.layerService.addLayer(imgLayer) ;

    const x = new TextLayer();
    x.text = "Text Layer: - }";
    x.top = 100 ;
    x.left = 100 ;
    x.name = "textLayer" ;
    this.layerService.addLayer(x) ;
  }

  getLayers() : BaseLayer[] {
    return this.layerService.getLayers() ;
  }

  selectLayerByClick(layerId: number) {
    this.layerService.setSelectedLayer(layerId) ;
  }

  layerDragStarted($event: CdkDragStart) {
    let layerId = +$event.source.element.nativeElement.id ;
    this.layerService.setSelectedLayer(layerId) ;
  }

  // https://stackoverflow.com/questions/54449939/how-to-get-the-position-after-drop-with-cdkdrag
  // https://stackoverflow.com/questions/22091733/dynamically-transform-in-css-using-ng-style
  layerDragEnded($event: CdkDragEnd) {
    let layerId = +$event.source.element.nativeElement.id ;
    let layer = this.layerService.getLayerById(layerId)! ;
    let position = $event.source.getFreeDragPosition() ;

    layer.deltaX = position.x ;
    layer.deltaY = position.y ;
    
    /*
    let nativeElement = $event.source.element.nativeElement ;

    console.log(nativeElement);
    //TODO This position seems to not be absolute
    
    let position = $event.source.getFreeDragPosition() ;
    console.log({ended:position});
    console.log({event:$event});
    
    let layer = this.layerService.getSelectedLayer()! ;
    
    layer.left += position.x ;
    layer.top += position.y ;

    console.log({left: layer.left, top: layer.top}) ;
    nativeElement.style.transform = 'none' //'translate3d(0, 0, 0)' ;
    nativeElement.style.left = `${layer.left}px` ;
    nativeElement.style.top = `${layer.top}px` ;
    //nativeElement.style.
    console.log($event.source.element.nativeElement);
    this.layerService.logLayers();
    */
  }
}
