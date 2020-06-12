import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ngxUiLoaderConfig } from 'src/shared/config/ngx-ui-loader.config';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // Http Client Module
    HttpClientModule,

    // UI Loader
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),

    NgxUiLoaderHttpModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
