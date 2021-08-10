export enum LayerType {
    Undefined,
    Image,
    Text,
}
export class BaseLayer {
    public id = 0;
    public get divId() { return `div_${this.id}`}
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
    public transform = '' ;
    public nativeElement: HTMLElement | null = null ;

    constructor(){}

    public get currentPosition() {
        return `${this.left+this.deltaX},${this.top+this.deltaY}`
    }

    public static getIdFromDivId(divId : string) {
        return +(divId.substring(4,divId.length)) ;
    }
    
    
    
    
    
    
}
