import { BaseLayer } from './base-layer';

describe('BaseLayer', () => {
  it('should create an instance', () => {
    expect(new BaseLayer(0,0,1)).toBeTruthy();
  });
});
