export enum LayerType {
    Undefined,
    Image,
    Text,
}
export class BaseLayer {
    public id = 0;
    public type = LayerType.Undefined ;
    public name = '';
    public left = 0 ;
    public top = 0 ;
    public z_index = 0 ;
    
    constructor(){}
    
    getLeftPx() {
        return `${this.left}px` ;
    }

    getTopPx() {
        return `${this.top}px` ;
    }

    getZindex() {
        return `${this.z_index}` ;
    }
}
