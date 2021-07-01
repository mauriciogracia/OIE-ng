import { BaseLayer, LayerType } from "./base-layer";

export class ImageLayer extends BaseLayer {
    public img_src = "" ;
    
    
    constructor() {
        super() ;
        this.type = LayerType.Image ;
    }

    
}
