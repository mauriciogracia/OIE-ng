export enum LayerType {
    Undefined,
    Image,
    Text,
}
export class BaseLayer {
    public id = 0;
    public type = LayerType.Undefined ;
    public name = '';
    
    private left = 1 ;
    private top = 1 ;
    private deltaX = 0 ;
    private deltaY = 0 ;
    public z_index = 0 ;
    public selected = false ;
    public visible = true ;
    public rotation = 0 ;
    public scale = 1 ;

    constructor(){}
    
    getInitialLeft():number {
        return this.left ;
    }

    getInitialTop():number {
        return this.top ;
    }

    getLeft():number {
        return this.left + this.deltaX ;
    }

    getTop():number {
        return this.top + this.deltaY;
    }

    getZindex() {
        return this.z_index ;
    }

    getLeftPx():string {
        return `${this.left}px` ;
    }

    getTopPx():string {
        return `${this.top}px` ;
    }

    positionLayer(newLeft: number, newTop: number) {
        /*
        this.deltaX = newLeft - this.left ;
        this.deltaY = newTop - this.top ; 
        */
        this.left = newLeft ;
        this.top = newTop ;
        this.deltaX = 0 ;
        this.deltaY = 0 ;
    }
    
    moveLayer(dx: number, dy: number) {
        /*
        this.left += this.deltaX + dx ;
        this.top += this.deltaY + dy;
        this.deltaX = 0 ;
        this.deltaY = 0 ; 
        */
        this.deltaX = dx ;
        this.deltaY = dy ; 
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

        /*
        if((this.deltaX != 0) || (this.deltaY != 0))
        {
            transform += `translate(${this.deltaX}px, ${this.deltaY}px) ` ;
        }
        */
        
        //console.log({transform:transform}) ;
        
        return transform ;
    }
}
