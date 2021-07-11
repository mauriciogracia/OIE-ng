import { BaseLayer } from "./base-layer";

export class Design {
    public name: string = '' ;
    private layers:BaseLayer[] = [];

    constructor(init?:Partial<Design>) {
        Object.assign(this, init) ;
    }
}


