import { BaseLayer } from "./base-layer";

export class Design {
    public name: string = '' ;
    private layers:BaseLayer[] = [];

    constructor(init?:Partial<Design>) {
        Object.assign(this, init) ;
    }

    /* //TODO use or remove this
    public setLayerList(layers:BaseLayer[]) {
        this.layers = layers ;
    }

    public getLayerList() : BaseLayer[] {
        return this.layers ;
    }
    */
}


