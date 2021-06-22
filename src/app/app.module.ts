import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayerPresenter } from './shared/components/layer-presenter/layer-presenter.component';
import { ToolBarComponent } from './shared/components/tool-bar/tool-bar.component';
import { AddEditLayerComponent } from './shared/components/add-edit-layer/add-edit-layer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LayerListComponent } from './shared/components/layer-list/layer-list.component';
import { LayerService } from './shared/services/layer.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollbarModule } from './shared/components/scrollbar/scrollbar.module';
import { NG_EVENT_PLUGINS } from '@tinkoff/ng-event-plugins';

@NgModule({
  declarations: [
    AppComponent,
    LayerPresenter,
    ToolBarComponent,
    AddEditLayerComponent,
    LayerListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ScrollbarModule
  ],
  providers: [
    LayerService,
    NG_EVENT_PLUGINS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
