import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseLayer, LayerType } from '../models/base-layer';
import { ImageLayer } from '../models/image-layer';
import { TextLayer } from '../models/text-layer';

@Injectable({
  providedIn: 'root'
})

export class LayerService {
  public version = "2022.06.14 - 9:35 pm";

  private layers: BaseLayer[] = [];
  private selectedLayerId = -1;
  private allLayersObs$: BehaviorSubject<BaseLayer[]> = new BehaviorSubject(this.layers);

  constructor() { }

  hasTransform(layer: BaseLayer) {
    return ((layer.scale != 1) || (layer.rotation != 0) || (layer.deltaX != 0) || (layer.deltaY != 0));
  }

  logTransform(layer: BaseLayer) {
    console.log({ transform: layer.transform, divStyle: layer.nativeElement?.style.cssText });
  }

  updateTransform(layer: BaseLayer) {
    let transform: string;

    //translate -> rotate -> scale
    // taken from https://www.stefanjudis.com/blog/order-in-css-transformation-transform-functions-vs-individual-transforms/
    if (layer) {
      if (!this.hasTransform(layer)) {
        transform = 'none';
      }
      else {
        transform = '';

        if ((layer.deltaX !== 0) || (layer.deltaY !== 0)) {
          transform += `translate(${layer.deltaX}px, ${layer.deltaY}px) `;
        }

        if (layer.rotation != 0) {
          transform += `rotate(${layer.rotation}deg) `;
        }

        if (layer.scale != 1) {
          transform += `scale(${layer.scale}) `;
        }
      }

      //is not used for painting only for exporting purposes
      layer.transform = transform;

      if (layer.nativeElement) {
        layer.nativeElement.style.transform = transform;
      }
    }
  }

  hasLayers() {
    return (this.layers.length > 0);
  }

  notifyLayerChanges() {
    this.allLayersObs$.next(this.layers);
  }

  clearLayers(notifyChanges: boolean) {
    this.layers = [];

    if (notifyChanges) {
      this.notifyLayerChanges();
    }
  }

  getAllLayersObs(): Observable<BaseLayer[]> {
    return this.allLayersObs$.asObservable();
  }

  getCurrentVisibleLayers() {
    return this.layers.filter(l => l.visible);
  }

  private getNewLayerDepthIndex() {
    return (this.layers.length + 1);
  }

  getSuggestedLayerName() {
    let max = Math.max(...this.layers.map(x => x.id), 0) + 1;

    return `Layer_${this.digits('' + max, 3)}`;
  }

  //TODO if more methods that are utilitary appear consider creating a UtilService and move this there
  private digits(value: string, padding: number) {
    var zeroes = new Array(padding + 1).join("0");
    return (zeroes + value).slice(-padding);
  }

  private getNewLayerId() {
    return Math.max(...this.layers.map(x => x.id), 0) + 1;
  }

  addLayer(layer: BaseLayer, notifyChanges: boolean, setAsSelected: boolean = true): number {
    layer.z_index = this.getNewLayerDepthIndex();
    layer.id = this.getNewLayerId();
    this.layers.push(layer);

    if (setAsSelected) {
      this.setSelectedLayer(layer, notifyChanges);
    }

    return layer.id;
  }

  getLayerById(layerId: number): BaseLayer | undefined {
    return this.layers.find(l => l.id === layerId);
  }

  anyLayerSelected() {
    return (this.selectedLayerId !== -1);
  }

  isLayerSelected(layerId: number) {
    return (this.anyLayerSelected) && (layerId == this.selectedLayerId);
  }

  unselectPreviousLayer(notifyChanges: boolean) {
    const layer = this.getSelectedLayer();

    if (layer) {
      layer.selected = false;
      this.selectedLayerId = -1;

      if (notifyChanges) {
        this.notifyLayerChanges();
      }
    }
  }

  isAnyLayerSelected() {
    return (this.getSelectedLayer() !== undefined);
  }

  getSelectedLayer() {
    return this.getLayerById(this.selectedLayerId);
  }

  setSelectedLayerById(layerId: number, notifyChanges: boolean) {
    this.setSelectedLayer(this.getLayerById(layerId), notifyChanges);
  }

  setSelectedLayer(layer: BaseLayer | undefined, notifyChanges: boolean) {
    if (layer) {
      this.unselectPreviousLayer(false);
      layer.selected = true;
      this.selectedLayerId = layer.id;

      if (notifyChanges) {
        this.notifyLayerChanges();
      }
    }
  }

  changeOrder(prevIndex: number, newIndex: number, notifyChanges: boolean) {
    if (prevIndex != newIndex) {
      let delta = (prevIndex > newIndex) ? 1 : -1;
      let i = Math.min(newIndex, prevIndex);
      const max = Math.max(prevIndex, newIndex);

      const temp = this.layers[prevIndex].z_index;
      this.layers[prevIndex].z_index = this.layers[newIndex].z_index;
      this.layers[newIndex].z_index = temp;

      for (i = i + 1; i < max; i++) {
        this.layers[i].z_index += delta;
      }
      //Keep layers sorted by z_index 
      this.layers = this.layers.sort((l1, l2) => (l1.z_index - l2.z_index));

      if (notifyChanges) {
        this.notifyLayerChanges();
      }
    }
  }

  toggleLayerVisibility(layer: BaseLayer, notifyChanges: boolean) {

    layer.visible = !layer.visible;

    if ((!layer.visible) && (layer.id === this.getSelectedLayer()?.id)) {
      this.unselectPreviousLayer(notifyChanges);
    }
    else if (notifyChanges) {
      this.notifyLayerChanges();
    }
  }

  getIndexOfLayer(layer: BaseLayer) {
    return this.layers.findIndex(l => l.id === layer.id);
  }

  removeLayer(layer: BaseLayer, notifyChanges: boolean) {
    let indexOfLayer = this.getIndexOfLayer(layer);
    if (indexOfLayer >= 0) {
      this.layers.splice(indexOfLayer, 1);
      if (notifyChanges) {
        this.notifyLayerChanges();
      }
    }
  }

  duplicateSelectedLayer(notifyChanges: boolean) {
    let selLayer = this.getSelectedLayer();

    if (selLayer?.type == LayerType.Text) {
      let txtLayer = new TextLayer();
      txtLayer.left = 2;
      txtLayer.top = 2;
      txtLayer.text = (selLayer as TextLayer).text;
      txtLayer.name = this.getSuggestedLayerName();
      this.addLayer(txtLayer, notifyChanges);
    }
    else {
      let imgLayer = new ImageLayer((selLayer as ImageLayer).img_src);
      imgLayer.scale = (selLayer as ImageLayer).scale;
      imgLayer.name = this.getSuggestedLayerName();
      this.addLayer(imgLayer, notifyChanges);
    }

  }

  logLayers() {
    this.layers.forEach(x => console.log(x));
  }
}
