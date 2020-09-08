import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInboxComponent } from './dashboard-inbox.component';
import { NgModule } from '@angular/core';
import { LeaderboardViewComponent } from "../leaderboard/leaderboard.component";
import { TasksListComponent } from "./tasks-list/tasks-list.component";
import { AssignRandomTaskComponent } from "./assign-random-task/assign-random-task.component";
import { TeamDashboardComponent } from "../team-dashboard/team-dashboard.component";
import { TasksBoardComponent } from "../tasks-board/tasks-board.component";
import { ClassAgendaComponent } from "../dashboard-classes/class-agenda/class-agenda.component";
import { ClassMembersComponent } from "../dashboard-classes/class-members/class-members.component";
import { ClassDetailsComponent } from "../dashboard-classes/class-details/class-details.component";

describe('DashboardInboxComponent', () => {
  let component: DashboardInboxComponent;
  let fixture: ComponentFixture<DashboardInboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardInboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@NgModule({
  imports: [LeaderboardViewComponent,TasksListComponent,AssignRandomTaskComponent,TeamDashboardComponent,TasksBoardComponent,ClassAgendaComponent, ClassMembersComponent, ClassDetailsComponent],

})export class DashboardInboxModule{}