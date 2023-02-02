import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CarSelectComponentComponent } from './car-select-component/car-select-component.component';
import { ColorSelectComponentComponent } from './color-select-component/color-select-component.component';

@NgModule({
  declarations: [
    AppComponent,
    CarSelectComponentComponent,
    ColorSelectComponentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
