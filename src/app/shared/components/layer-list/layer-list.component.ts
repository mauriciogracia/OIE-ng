import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { BaseLayer } from '../../models/base-layer';
import { LayerService } from '../../services/layer.service';

@Component({
  selector: 'app-layer-list',
  templateUrl: './layer-list.component.html',
  styleUrls: ['./layer-list.component.css']
})
export class LayerListComponent implements OnInit {
  @Input() CompactMode: boolean = false ;
  isCompactMode: boolean = false ;
  
  constructor(private layerService : LayerService) { }

  ngOnInit(): void {
    this.isCompactMode = this.CompactMode ;
  }

  getLayers() : BaseLayer[] {
    return this.layerService.getLayers() ;
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
