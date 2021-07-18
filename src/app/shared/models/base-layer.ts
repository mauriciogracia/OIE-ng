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
    public deltaX = 0 ;
    public deltaY = 0 ;
    public z_index = 0 ;
    public selected = false ;
    public visible = true ;
    public rotation = 0 ;
    public scale = 1 ;

    constructor(){}
    
    
    
    hasTransform() {
        return ((this.scale != 1) || (this.rotation != 0) || (this.deltaX != 0) || (this.deltaY != 0))  ;
    }
    
    getTransform() {
        let transform = '' ;

        if(this.scale != 1)
        {
            transform += `scale(${this.scale}) ` ;
        }

        if(this.rotation != 0)
        {
            transform += `rotate(${this.rotation}deg) ` ;
        }

        if((this.deltaX != 0) || (this.deltaY != 0))
        {
            transform += `translate(${this.deltaX}px, ${this.deltaY}px) ` ;
        }
        
        return transform ;
    }
}
