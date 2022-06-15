import { BaseLayer, LayerType } from "./base-layer";

export class ImageLayer extends BaseLayer {
    public img_src = "";
    public isGIF: boolean = false;

    constructor(imgPath: string) {
        super();
        this.img_src = imgPath;
        this.determinImageType();
    }

    determinImageType() {
        let pos: number = this.img_src.lastIndexOf('.');
        let ext: string = this.img_src.substring(pos, this.img_src.length);

        if (ext.toUpperCase() == '.GIF') {
            this.type = LayerType.Animated;
        }
        else {
            this.type = LayerType.Image;
        }
    }

    getImagePath(): string {
        let imageURL;

        if (this.img_src.startsWith('http://') || this.img_src.startsWith('https://')) {
            imageURL = this.img_src;
        }
        else {
            imageURL = `${window.location.href}/${this.img_src}`;
        }

        return imageURL;
    }
}
