import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardHeaderComponent } from './dashboard/dashboard-header/dashboard-header.component';
import { DashboardInboxComponent } from './dashboard/dashboard-inbox/dashboard-inbox.component';
import { DashboardClassesComponent } from './dashboard/dashboard-classes/dashboard-classes.component';
import { ClassDetailsComponent } from './dashboard/dashboard-classes/class-details/class-details.component';
import { InviteStudentsComponent } from './dashboard/dashboard-classes/invite-students/invite-students.component';
import { ClassAgendaComponent } from './dashboard/dashboard-classes/class-agenda/class-agenda.component';
import { ClassMembersComponent } from './dashboard/dashboard-classes/class-members/class-members.component';
import { UserComponent } from './dashboard/user/user.component';


const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [

      {
        path: '', component: DashboardHeaderComponent, children: [

          { path: 'inbox', component: DashboardInboxComponent },
          { path: 'classes/list', component: DashboardClassesComponent },
          {
            path: 'classes', component: ClassDetailsComponent, children: [

              { path: 'agenda', component: ClassAgendaComponent },
              { path: 'members', component: ClassMembersComponent },
              { path: 'invite', component: InviteStudentsComponent },

            ]
          },
          { path: 'user', component: UserComponent },
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
