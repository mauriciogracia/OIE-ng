export enum LayerType {
    Undefined,
    Image,
    Text,
}
export class BaseLayer {
    public id = 0;
    public type = LayerType.Undefined ;
    public name = '';
    public left = 1 ;
    public top = 1 ;
    public z_index = 0 ;
    public selected = false ;
    public visible = true ;
    public rotation = 0 ;
    
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
