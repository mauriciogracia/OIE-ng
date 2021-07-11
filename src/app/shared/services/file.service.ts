import { ElementRef, Injectable } from '@angular/core';
import { Design } from '../models/design';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  public currentDesign : Design | null = null;
  public hasPendingChanges : boolean = false ;
  public exportElement : ElementRef | null = null ;

  constructor() { }

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

  setExportElement(element: ElementRef) {
    this.exportElement = element ;
  }

  exportToHTML() {
    console.log({exportToHTML: this.exportElement}) ;
    return this.exportElement!.nativeElement.innerHTML.replace(/<!--[\s\S]*?-->/g, '');
    //return this.exportElement!.nativeElement.querySelector('.content').outerHTML.replace(/<!--[\s\S]*?-->/g, '');
  }
      

  exportToImage() {
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
      */
    }
  }
}
