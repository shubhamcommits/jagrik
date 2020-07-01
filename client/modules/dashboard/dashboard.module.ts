import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardHeaderComponent } from './dashboard/dashboard-header/dashboard-header.component';
import { DashboardInboxComponent } from './dashboard/dashboard-inbox/dashboard-inbox.component';
import { DashboardClassesComponent } from './dashboard/dashboard-classes/dashboard-classes.component';
import { CreateClassComponent } from './dashboard/dashboard-classes/create-class/create-class.component';
import { ClassViewComponent } from './dashboard/dashboard-classes/class-view/class-view.component';
import { ClassDetailsComponent } from './dashboard/dashboard-classes/class-details/class-details.component';
import { InviteStudentsComponent } from './dashboard/dashboard-classes/invite-students/invite-students.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClassMembersComponent } from './dashboard/dashboard-classes/class-members/class-members.component';
import { ClassAgendaComponent } from './dashboard/dashboard-classes/class-agenda/class-agenda.component';
import { UserComponent } from './dashboard/user/user.component';
import { JoinClassComponent } from './dashboard/dashboard-classes/join-class/join-class.component';


@NgModule({
  declarations: [
    DashboardComponent, 
    DashboardHeaderComponent, 
    DashboardInboxComponent, 
    DashboardClassesComponent, 
    CreateClassComponent, 
    ClassViewComponent, ClassDetailsComponent, InviteStudentsComponent, ClassMembersComponent, ClassAgendaComponent, UserComponent, JoinClassComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
