import { BaseLayer, LayerType } from "./base-layer";

export class TextLayer extends BaseLayer{
    public text = "" ;
    
    constructor() {
        super() ;
        this.type = LayerType.Text ;
    }
}
