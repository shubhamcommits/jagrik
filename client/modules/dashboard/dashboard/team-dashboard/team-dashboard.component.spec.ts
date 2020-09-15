import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TeamDashboardComponent } from './team-dashboard.component';
import { ClassMembersComponent } from '../dashboard-classes/class-members/class-members.component';


// @NgModule decorator with its metadata
@NgModule({
  // declarations: [TeamDashboardComponent],
  imports: [BrowserModule,ClassMembersComponent],
  // providers: []
})
export class TeamDashboardModule {}