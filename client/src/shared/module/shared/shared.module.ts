import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerPageComponent } from './loading-spinner-page/loading-spinner-page.component';




@NgModule({
  declarations: [LoadingSpinnerPageComponent],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingSpinnerPageComponent
  ]
})
export class SharedModule { }
