import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInboxComponent } from './dashboard-inbox.component';
import { NgModule } from '@angular/core';
import { LeaderboardViewComponent } from "../leaderboard/leaderboard.component";
import { TasksListComponent } from "./tasks-list/tasks-list.component";
import { AssignRandomTaskComponent } from "./assign-random-task/assign-random-task.component";
import { TeamDashboardComponent } from "../team-dashboard/team-dashboard.component";

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
  imports: [LeaderboardViewComponent,TasksListComponent,AssignRandomTaskComponent,TeamDashboardComponent],

})export class DashboardInboxModule{}