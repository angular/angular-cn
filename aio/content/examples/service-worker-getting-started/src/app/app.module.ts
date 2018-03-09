import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// #docregion sw-import
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
// #enddocregion sw-import

import { CheckForUpdateService } from './check-for-update.service';
import { LogUpdateService } from './log-update.service';
import { PromptUpdateService } from './prompt-update.service';

// #docregion sw-module
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [
    CheckForUpdateService,
    LogUpdateService,
    PromptUpdateService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
// #enddocregion sw-module
