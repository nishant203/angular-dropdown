import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import {CdkVirtualScrollViewport, ScrollingModule} from '@angular/cdk/scrolling';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectComponent } from './shared/select/select.component';
import { SelectItemComponent } from './shared/select/select-item/select-item.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SelectComponent,
    SelectItemComponent,
  ],
  imports: [
    BrowserModule,
    OverlayModule,
    PortalModule,
    AppRoutingModule,
    ScrollingModule,
    FormsModule
  ],
  providers: [CdkVirtualScrollViewport],
  bootstrap: [AppComponent]
})
export class AppModule { }
