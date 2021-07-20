import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayerPresenter } from './shared/components/layer-presenter/layer-presenter.component';
import { ToolBarComponent } from './shared/components/tool-bar/tool-bar.component';
import { AddEditImageLayerComponent } from './shared/components/add-edit-image-layer/add-edit-image-layer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LayerListComponent } from './shared/components/layer-list/layer-list.component';
import { LayerService } from './shared/services/layer.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollbarModule } from './shared/components/scrollbar/scrollbar.module';
import { NG_EVENT_PLUGINS } from '@tinkoff/ng-event-plugins';
import { MatIconModule } from '@angular/material/icon';
import { CastTo } from './shared/castTo-pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from "@angular/material/dialog";
import { AddEditTextLayerComponent } from './shared/components/add-edit-text-layer/add-edit-text-layer.component';
import { MatInputModule } from "@angular/material/input";
import { FileSaverModule } from 'ngx-filesaver';
import { FreeDraggingDirective } from './shared/free-dragging.directive';

@NgModule({
  declarations: [
    AppComponent,
    LayerPresenter,
    ToolBarComponent,
    AddEditImageLayerComponent,
    AddEditTextLayerComponent,
    LayerListComponent,
    CastTo,
    FreeDraggingDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ScrollbarModule,
    MatIconModule,
    DragDropModule,
    MatDialogModule,
    MatInputModule,
    FileSaverModule,
  ],
  providers: [
    LayerService,
    NG_EVENT_PLUGINS
  ],
  exports: [FreeDraggingDirective],
  bootstrap: [AppComponent],
  entryComponents: [
    AddEditImageLayerComponent,
    AddEditTextLayerComponent,
  ]
})
export class AppModule { }
