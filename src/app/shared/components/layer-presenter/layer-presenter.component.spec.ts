import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerPresenter } from './layer-presenter.component';
import { CastToPipe } from '../../pipes/castTo-pipe';

describe('LayerPresenterComponent', () => {
  let component: LayerPresenter;
  let fixture: ComponentFixture<LayerPresenter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayerPresenter, CastToPipe]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerPresenter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
