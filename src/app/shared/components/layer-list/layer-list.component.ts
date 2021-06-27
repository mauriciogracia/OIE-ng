import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { BaseLayer } from '../../models/base-layer';
import { LayerService } from '../../services/layer.service';

@Component({
  selector: 'app-layer-list',
  templateUrl: './layer-list.component.html',
  styleUrls: ['./layer-list.component.css']
})
export class LayerListComponent implements OnInit {
  
  constructor(private layerService : LayerService) { }

  ngOnInit(): void {
  }

  getLayers() : BaseLayer[] {
    return this.layerService.getLayers() ;
  }

  changeLayerSelection(layerId:number) {
    this.layerService.setSelectedLayer(layerId) ;
  }

  drop(event: CdkDragDrop<string[]>) {
    this.layerService.changeOrder(event.previousIndex, event.currentIndex) ;
  }
}
