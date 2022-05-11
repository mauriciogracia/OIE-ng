import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ImageLayer } from '../../models/image-layer';
import { LayerService } from '../../services/layer.service';
import { BaseLayer, LayerType } from '../../models/base-layer';
import { TextLayer } from '../../models/text-layer';
import { AppSettings } from '../../models/app-settings';
import { Design } from '../../models/design';
import { FileService } from '../../services/file.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CdkDragEnd, CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-layer-presenter',
  templateUrl: './layer-presenter.component.html',
  styleUrls: ['./layer-presenter.component.css']
})
export class LayerPresenter implements OnInit, OnDestroy, AfterViewInit {
  /* this is done to make the types visible to the template/html*/
  layerType = LayerType;
  imageLayer = ImageLayer;
  textLayer = TextLayer;

  numDemoLayers = 22;
  allLayers: BaseLayer[] = [];
  unsubscribeFromAllLayersObs$: Subject<boolean> = new Subject();

  constructor(
    private layerService: LayerService,
    private fileService: FileService,
    private appSettings: AppSettings,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.addDemoLayers();
    this.layerService.getAllLayersObs()
      .pipe(takeUntil(this.unsubscribeFromAllLayersObs$))
      .subscribe((allLayers) => {
        this.allLayers = allLayers;
        this.linkDivToLayers();
        console.log("layer presenter refreshed");
      });
  }

  ngAfterViewInit(): void {
    this.linkDivToLayers();
  }

  linkDivToLayers() {
    console.log('linkDivToLayers');
    this.allLayers
      .filter(l => !l.nativeElement)
      .forEach(layer => {
        layer.nativeElement = this.getHtmlNodeByLayerid(layer.id);
        this.layerService.updateTransform(layer);
      });
  }

  getHtmlNodeByLayerid(layerId: number): HTMLElement | null {
    const ne = this.elementRef.nativeElement as HTMLElement;
    return ne.querySelector(`#div_${layerId}`) as HTMLElement;
  }

  positionLayer(layerId: number, newLeft: number, newTop: number) {
    let layer = this.layerService.getLayerById(layerId);

    if (layer) {
      layer.left = newLeft;
      layer.top = newTop;
      layer.deltaX = 0;
      layer.deltaY = 0;
      this.layerService.updateTransform(layer);
    }
  }

  moveLayer(layerId: number, dx: number, dy: number) {
    let layer = this.layerService.getLayerById(layerId);

    if (layer) {
      layer.deltaX = dx;
      layer.deltaY = dy;
      this.layerService.updateTransform(layer);
    }
  }

  addDemoLayers() {
    let notifyChanges = false;
    const design = new Design({ name: "demo.oie" });
    this.fileService.currentDesign = design;

    const imgLayer = new ImageLayer();
    imgLayer.img_src = "assets/back_01.jpg";
    imgLayer.scale = 1;
    imgLayer.name = "background";

    this.layerService.addLayer(imgLayer, notifyChanges);

    for (let i = 2; i <= this.numDemoLayers; i++) {
      const x = new TextLayer();
      x.left = 10 + i * 30;
      x.top = 10 + i * 15;
      x.text = `Text Layer - ${i} : - }`;
      x.name = this.layerService.getSuggestedLayerName();
      this.layerService.addLayer(x, notifyChanges, i == 2);
    }

    this.layerService.notifyLayerChanges();
  }

  hasLayers() {
    return this.layerService.hasLayers();
  }

  selectLayerByClick(layer: BaseLayer) {
    const notifyChanges = true;
    this.layerService.setSelectedLayer(layer, notifyChanges);
  }

  layerDragStarted($event: CdkDragStart) {
    let layerId = BaseLayer.getIdFromDivId($event.source.element.nativeElement.id);

    if (this.appSettings.selectLayerWhileDragging) {
      const notifyChanges = true;
      this.layerService.setSelectedLayerById(layerId, notifyChanges)
    }
  }

  layerDragHappening($event: CdkDragEnd | CdkDragMove) {
    let layerId = this.layerService.getSelectedLayer()!.id;
    let position = $event.source.getFreeDragPosition();

    this.moveLayer(layerId, position.x, position.y);
  }

  ngOnDestroy(): void {
    this.unsubscribeFromAllLayersObs$.next(true);
    this.unsubscribeFromAllLayersObs$.complete();
  }
}
