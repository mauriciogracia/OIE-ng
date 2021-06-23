import { Component, OnInit } from '@angular/core';
import { ImageLayer } from '../../models/image-layer';
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

  getLayers() : ImageLayer[] {
    return this.layerService.getLayers() ;
  }

  showLayerSelection(layerId:number) {
    console.log({layerId:layerId}) ;
  }
}
