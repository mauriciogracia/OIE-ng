import { BaseLayer, LayerType } from "./base-layer";

export class ImageLayer extends BaseLayer {
    public img_src = "" ;
    public scale = 1 ;
    
    constructor() {
        super() ;
        this.type = LayerType.Image ;
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
