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
import { TeamComponent } from './dashboard/team/team.component';
import { TasksBoardComponent } from './dashboard/tasks-board/tasks-board.component';
import { ResourcePageComponent } from '../dashboard/dashboard/resource-page/resource-page.component';
import { AnnouncementComponent } from '../dashboard/dashboard/announcement/announcement.component';
import { BonusTaskComponent } from './dashboard/bonus-task/bonus-task.component';
import { TeamDashboardComponent } from './dashboard/team-dashboard/team-dashboard.component';
import { LeaderboardViewComponent } from './dashboard/leaderboard/leaderboard.component';
import { PendingTaskViewComponent } from './dashboard/pending-task/pending-task.component';
import { WildTaskComponent } from './dashboard/wiild-task/wild-task.component';
import { TaskDetailModalComponent } from '../dashboard/dashboard/dashboard-inbox/facilitator-view/task-detail-modal/task-detail-modal.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: DashboardHeaderComponent,
        children: [
          { path: 'inbox', component: DashboardInboxComponent },
          { path: 'task-detail/:taskId', component: TaskDetailModalComponent },
          { path: 'tasks', component: TasksBoardComponent },
          { path: 'resource-list', component: ResourcePageComponent },
          { path: 'bouns-tasks', component: BonusTaskComponent },
          { path: 'wild-tasks', component: WildTaskComponent },
          { path: 'announcement', component: AnnouncementComponent },
          { path: 'classes/list', component: DashboardClassesComponent },
          {
            path: 'classes',
            component: ClassDetailsComponent,
            children: [
              { path: 'agenda', component: ClassAgendaComponent },
              { path: 'members', component: ClassMembersComponent },
              { path: 'invite', component: InviteStudentsComponent },
            ],
          },
          { path: 'team', component: TeamComponent },
          { path: 'team-dashboard', component: TeamDashboardComponent },
          { path: 'pending-task', component: PendingTaskViewComponent },
          { path: 'leaderboard', component: LeaderboardViewComponent },
          { path: 'user', component: UserComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
