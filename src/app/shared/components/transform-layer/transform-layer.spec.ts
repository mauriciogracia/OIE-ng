import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformLayerComponent } from './transform-layer.component';

describe('TransformLayerComponent', () => {
  let component: TransformLayerComponent;
  let fixture: ComponentFixture<TransformLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransformLayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransformLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
