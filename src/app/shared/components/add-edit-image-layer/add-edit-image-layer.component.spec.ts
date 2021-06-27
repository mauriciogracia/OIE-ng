import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditImageLayerComponent } from './add-edit-image-layer.component';

describe('AddEditImageLayerComponent', () => {
  let component: AddEditImageLayerComponent;
  let fixture: ComponentFixture<AddEditImageLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditImageLayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditImageLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
