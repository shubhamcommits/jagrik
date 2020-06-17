import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardHeaderComponent } from './dashboard/dashboard-header/dashboard-header.component';
import { DashboardInboxComponent } from './dashboard/dashboard-inbox/dashboard-inbox.component';
import { DashboardClassesComponent } from './dashboard/dashboard-classes/dashboard-classes.component';
import { ClassDetailsComponent } from './dashboard/dashboard-classes/class-details/class-details.component';


const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [

      {
        path: '', component: DashboardHeaderComponent, children: [

          { path: 'inbox', component: DashboardInboxComponent },
          { path: 'classes', component: DashboardClassesComponent },
          { path: 'classes/:id', component: ClassDetailsComponent }
        ]
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
