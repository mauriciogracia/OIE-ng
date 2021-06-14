import { BaseLayer } from "./base-layer";

export class ImageLayer extends BaseLayer {
    img_src = "" ;
    scale = 1 ;
    
    constructor(left:number, top:number, img_src: string,  scale: number, z_index:number) {
        super(left, top, z_index) ;
        this.img_src = img_src ;
        this.scale = scale ;
    }

    getTransform() {
        let transform = '' ;

        if(this.scale != 1)
        {
            transform = `scale(${this.scale})` ;
        }
        
        return transform ;
    }
}
/*
/ in your .html file
<input type="file" class="form-control"
            accept="image/*" 
            (change)="onChange($event)">    

// in your .ts file
onChange(fileInput: any) {
    const URL = window.URL || window.webkitURL;
    const Img = new Image();

    const filesToUpload = (fileInput.target.files);
    Img.src = URL.createObjectURL(filesToUpload[0]);

    Img.onload = (e: any) => {
      const height = e.path[0].height;
      const width = e.path[0].width;

      console.log(height,width);
  }
}
*/
