import { BaseLayer, LayerType } from "./base-layer";

export class ImageLayer extends BaseLayer {
    public img_src = "" ;
    
    
    constructor() {
        super() ;
        this.type = LayerType.Image ;
    }

    getImageurl():string {
        let imageURL ;

        if(this.img_src.startsWith('http://') || this.img_src.startsWith('https://')) {
            imageURL = this.img_src ;
        }
        else {
            imageURL = `${window.location.href}/${this.img_src}` ;
        }

        return imageURL ;
    }
}
