import { BaseLayer, LayerType } from "./base-layer";

export class TextLayer extends BaseLayer{
    public text = "" ;

    public fontFamily = "Arial, Helvetica, sans-serif"; 
    public fontSize = "14px" ; 
    public fontWeight = "normal" ;

    constructor() {
        super() ;
        this.type = LayerType.Text ;
    }
}
