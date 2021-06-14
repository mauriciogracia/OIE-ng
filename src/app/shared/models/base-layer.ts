export class BaseLayer {
    left = 0 ;
    top = 0 ;
    z_index = 0 ;
    
    constructor(left:number, top:number, z_index:number) {
        this.left = left ;
        this.top = top ;
        this.z_index = z_index ;
    }

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
