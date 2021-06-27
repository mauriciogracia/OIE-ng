import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTextLayerComponent } from './add-edit-text-layer.component';

describe('AddEditTextLayerComponent', () => {
  let component: AddEditTextLayerComponent;
  let fixture: ComponentFixture<AddEditTextLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditTextLayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditTextLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
