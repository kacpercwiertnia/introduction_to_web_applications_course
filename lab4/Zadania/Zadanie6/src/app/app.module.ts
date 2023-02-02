import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TopicSelectorComponent } from './topic-selector/topic-selector.component';
import { TopicDisplayComponent } from './topic-display/topic-display.component';

@NgModule({
  declarations: [
    AppComponent,
    TopicSelectorComponent,
    TopicDisplayComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
