import { Injectable } from '@angular/core';
import { BaseLayer } from '../models/base-layer';
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
    private layerService : LayerService
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

  exportLayerStyle(layer: BaseLayer) {
    /*
    [style.left]="layer.getLeftPx()"
            [style.top]="layer.getTopPx()"
            [style.transform]="layer.getTransform()"
            [style.z-index]="layer.getZindex()"
            [style.outline]="(layer.selected) ? 'dashed 1px red':''"
    */
  }

  exportLayerToHTML(layer: BaseLayer) {
    let div = `<div id="${layer.id}" style="position: absolute;
    transform-origin: left top ;">` ;

    if(layer instanceof ImageLayer)
    {
      div += `<img src="${layer.img_src}" alt="image:${layer.img_src}">` ;
    }
    else if(layer instanceof TextLayer)
    {
      div += `<span style="white-space: nowrap;">${layer.text}</span>` ;
    }

    div += '</div>' ;

    return div ;
  }

  exportToHTML() {
    let html = `<!DOCTYPE html><html lang="en"><head><title>${this.currentDesign?.name}</title></head><body>` ;
    this.layerService.getVisibleLayers().forEach(l => {
      html += this.exportLayerToHTML(l) ;
    });
    html += "</body></html>" ;

    console.log(html) ;
  }
      
  browserSaveAs() {

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
