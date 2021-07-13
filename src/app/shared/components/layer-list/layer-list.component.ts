import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseLayer } from '../../models/base-layer';
import { LayerService } from '../../services/layer.service';

@Component({
  selector: 'app-layer-list',
  templateUrl: './layer-list.component.html',
  styleUrls: ['./layer-list.component.css']
})
export class LayerListComponent implements OnInit, OnDestroy {
  @Input() CompactMode: boolean = false ;
  isCompactMode: boolean = false ;
  layers: BaseLayer[] = [] ;
  unsubscribeFromAllLayersObs$: Subject<boolean> = new Subject();

  constructor(private layerService : LayerService) { }
  

  ngOnInit(): void {
    this.isCompactMode = this.CompactMode ;
    this.layerService.getAllLayersObs()
    .pipe(takeUntil(this.unsubscribeFromAllLayersObs$))
    .subscribe(layersFromService => {this.layers = layersFromService ; console.log("layer list reacted")});
  }

  ngOnDestroy(): void {
    this.unsubscribeFromAllLayersObs$.next(true);
    this.unsubscribeFromAllLayersObs$.complete();
  }

  changeLayerSelection(layer:BaseLayer) {
    this.layerService.setSelectedLayer(layer) ;
  }

  drop(event: CdkDragDrop<string[]>) {
    this.layerService.changeOrder(event.previousIndex, event.currentIndex) ;
  }

  toggleCompactMode() {
    this.isCompactMode = !this.isCompactMode ;
  }
  
  toggleLayerVisibility(layer:BaseLayer) {
    this.layerService.toggleLayerVisibility(layer) ;
  }

  confirmLayerDelete(layer:BaseLayer) {
    if(confirm(`Are you sure to delete layer: ${layer.name}(id=${layer.id})`)) {
      this.layerService.removeLayer(layer) ;
    }
  }
}
