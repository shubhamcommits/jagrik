import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ngxUiLoaderConfig } from 'src/shared/config/ngx-ui-loader.config';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthorizationInterceptorService } from 'src/shared/services/authorization-interceptor-service/authorization-interceptor.service';



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

    NgxUiLoaderHttpModule,

    BrowserAnimationsModule

  ],
  providers: [
    // HASH LOCATION STRATEGY
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
