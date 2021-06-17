import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayerPresenter } from './shared/components/layer-presenter/layer-presenter.component';
import { ToolBarComponent } from './shared/components/tool-bar/tool-bar.component';
import { AddEditLayerComponent } from './shared/components/add-edit-layer/add-edit-layer.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LayerPresenter,
    ToolBarComponent,
    AddEditLayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
