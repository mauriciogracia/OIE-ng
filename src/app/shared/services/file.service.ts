import { Injectable } from '@angular/core';
import { FileSaverService } from 'ngx-filesaver';
import { BaseLayer, LayerType } from '../models/base-layer';
import { Design } from '../models/design';
import { ImageLayer } from '../models/image-layer';
import { TextLayer } from '../models/text-layer';
import { LayerService } from './layer.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  public currentDesign : Design | null = null;
  public hasPendingChanges : boolean = false ;

  constructor(
    private layerService : LayerService,
    private fileSaverService: FileSaverService
  ) { }

  public export() : string {
    return JSON.stringify(this.currentDesign) ;
  }

  public import(fileContent: string) {
    try {
      this.currentDesign = JSON.parse(fileContent) ;
    }
    catch (e) 
    {
      console.log({exception:e}) ;
      this.currentDesign = null ;
    }
  }

  buildLayerStyle(layer: BaseLayer) {
    let style = 'position: absolute;transform-origin: left top ;'

    style += `left: ${layer.left}px; ` ;
    style += `top: ${layer.top}px; ` ;
    style += `z-index: ${layer.z_index}; ` ;
    style += `transform: ${layer.transform}; ` ;

    style = `style="${style}"` ;
    
    return style ;
  }

  exportLayerToHTML(layer: BaseLayer) {
    let div = `<div id="${layer.id}" ${this.buildLayerStyle(layer)}>` ;

    if(layer.type === LayerType.Image)
    {
      let img = (layer as ImageLayer).getImageurl() ;
      div += `<img src="${img}" alt="image:${img}">` ;
    }
    else if(layer.type === LayerType.Text)
    {
      div += `<span style="white-space: nowrap;">${(layer as TextLayer).text}</span>` ;
    }

    div += '</div>' ;

    return div ;
  }

  exportToHTML() {
    let title: string = this.currentDesign!.name ;
    let html = `<!DOCTYPE html><html lang="en"><head><title>${title}</title></head><body>` ;
    
    this.layerService.getCurrentVisibleLayers().forEach(layer => {
      html += this.exportLayerToHTML(layer) ;
    });
    
    html += "</body></html>" ;

    this.browserSaveAs(html, `${title}.html`) ;
  }
      
  browserSaveAs(blob: any, filename:string) {
    try {
      this.fileSaverService.save(blob, filename);
    }
    catch (e)
    {
      console.log(e) ;
    }
  }

  exportToImage() {
    /*
    console.log({exportElement:this.exportElement}) ; 

    if(this.exportElement) {
      //domtoimage.toBlob(document.getElementById('my-node'))
      /*
      Since I'm ussing google fonts from other sites this error is happening
      Error while reading CSS rules from null SecurityError: CSSStyleSheet.cssRules getter: Not allowed to access cross-origin stylesheet
      */
     /*
      domtoimage.toBlob(this.exportElement.nativeElement)
      .then(function (blob:any) {
          //window.saveAs(blob, 'my-node.png');
          //FileSaver.saveAs(blob, "abc.png");
          console.log({imgBlob:blob})
      });
     
    }
     */
  }
}
