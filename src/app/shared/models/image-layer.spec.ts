import { ImageLayer } from './image-layer';

describe('ImageLayer', () => {
  it('should create an instance', () => {
    expect(new ImageLayer(10,40,"algo.png",1,1)).toBeTruthy();
  });
});
