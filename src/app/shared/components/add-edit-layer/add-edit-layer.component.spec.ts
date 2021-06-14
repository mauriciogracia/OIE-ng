import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLayerComponent } from './add-edit-layer.component';

describe('AddEditLayerComponent', () => {
  let component: AddEditLayerComponent;
  let fixture: ComponentFixture<AddEditLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditLayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
