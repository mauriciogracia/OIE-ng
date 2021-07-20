import { Component, OnDestroy, OnInit } from '@angular/core';
import { ImageLayer } from '../../models/image-layer';
import { LayerService } from '../../services/layer.service';
import { BaseLayer, LayerType } from '../../models/base-layer';
import { TextLayer } from '../../models/text-layer';
import { CdkDragEnd, CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop/drag-events';
import { AppSettings } from '../../models/app-settings';
import { Design } from '../../models/design';
import { FileService } from '../../services/file.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-layer-presenter',
  templateUrl: './layer-presenter.component.html',
  styleUrls: ['./layer-presenter.component.css']
})
export class LayerPresenter implements OnInit, OnDestroy  {
  /* this is done to make the types visible to the template/html*/
  layerType = LayerType ;
  imageLayer = ImageLayer ;
  textLayer = TextLayer ;

  visibleLayers : BaseLayer[] = [] ;
  unsubscribeFromAllLayersObs$: Subject<boolean> = new Subject();
  
  constructor(
    private layerService : LayerService, 
    private fileService : FileService,
    private appSettings: AppSettings) { }



  ngOnInit(): void {
    this.addDemoLayers() ;
    this.layerService.getAllLayersObs()
      .pipe(takeUntil(this.unsubscribeFromAllLayersObs$))
      .subscribe(layersFromService => {this.visibleLayers = layersFromService.filter(l => l.visible); console.log("layer presenter refreshed")})
  }

  ngOnDestroy(): void {
    this.unsubscribeFromAllLayersObs$.next(true);
    this.unsubscribeFromAllLayersObs$.complete();
  }

  addDemoLayers() {
    let notifyChanges = false ;
    const design = new Design({name:"demo.oie"}) ;
    this.fileService.currentDesign = design ;

    const imgLayer = new ImageLayer() ;
    imgLayer.img_src = "assets/back_01.jpg" ;
    imgLayer.scale = 1 ;
    imgLayer.name= "background" ;
    
    this.layerService.addLayer(imgLayer,notifyChanges) ;

    for(let i=1; i < 22 ; i++) {
      const x = new TextLayer();
      x.text = `Text Layer - ${i} : - }`;
      x.name = `text_${i}` ;
      let layerId = this.layerService.addLayer(x, notifyChanges) ;
      this.layerService.positionLayer(layerId, 100+i*15,100+i*15) ;
    }

    this.layerService.notifyLayerChanges();
  }

  hasLayers() {
    return this.layerService.hasLayers() ;
  }

  selectLayerByClick(layer: BaseLayer) {
    const notifyChanges = true ;
    this.layerService.setSelectedLayer(layer, notifyChanges) ;
  }

  layerDragStarted($event: CdkDragStart) {
    if(this.appSettings.selectLayerWhileDragging) {
      let layerId = +$event.source.element.nativeElement.id ;
      let position = $event.source.getFreeDragPosition() ;
      const notifyChanges = true ;
      this.layerService.setSelectedLayerById(layerId, notifyChanges) ;

      console.log({layerDragStarted:position}) ;
      this.layerService.dragStart(layerId, position.x, position.y) ;
    }
  }
  
  layerDragMoved($event: CdkDragMove) {
    let layerId = +$event.source.element.nativeElement.id ;
    let position = $event.source.getFreeDragPosition() ;
  
    console.log({layerDragMoved:position}) ;
    this.layerService.dragInProgress(layerId, position.x, position.y) ;
  }

  layerDragEnded($event: CdkDragEnd) {
    let layerId = +$event.source.element.nativeElement.id ;

    this.layerService.dragEnd(layerId) ;
  }

  
}
