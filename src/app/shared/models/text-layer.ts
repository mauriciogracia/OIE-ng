import { BaseLayer, LayerType } from "./base-layer";

export class TextLayer extends BaseLayer{
    public text = "" ;
    public scale = 1 ;
    
    constructor(txt:string) {
        super() ;
        this.type = LayerType.Text ;
        this.text = txt ;
    }

}
