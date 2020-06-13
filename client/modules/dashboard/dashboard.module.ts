import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Request Interceptor Service
import { AuthorizationInterceptorService } from 'src/shared/services/authorization-interceptor-service/authorization-interceptor.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardHeaderComponent } from './dashboard/dashboard-header/dashboard-header.component';
import { DashboardInboxComponent } from './dashboard/dashboard-inbox/dashboard-inbox.component';


@NgModule({
  declarations: [DashboardComponent, DashboardHeaderComponent, DashboardInboxComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptorService, multi: true }
  ]
})
export class DashboardModule { }
