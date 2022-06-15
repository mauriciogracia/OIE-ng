import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseLayer } from '../models/base-layer';
import { ImageLayer } from '../models/image-layer';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor() { }

  showCurrentLayerData(layer: BaseLayer, formGroup: FormGroup) {
    formGroup.patchValue(layer);
    formGroup.controls['left'].setValue(layer.left + layer.deltaX);
    formGroup.controls['top'].setValue(layer.top + layer.deltaY);
  }

  showCurrentData(data: any, formGroup: FormGroup) {
    formGroup.patchValue(data);
  }

  updateLayerWithForm(layer: BaseLayer, formGroup: FormGroup) {
    layer = Object.assign(layer, formGroup.value);
  }

  setLayerImageOrSample(layer: ImageLayer, formGroup: FormGroup) {
    let imgURL: string = formGroup.controls['img_src'].value;
    let src: string;

    if (imgURL) {
      src = imgURL;
    }
    else {
      src = 'assets/text_02.png';
    }

    layer.img_src = src;
  }
}
