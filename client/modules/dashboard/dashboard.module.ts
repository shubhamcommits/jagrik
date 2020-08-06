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
import { TeamComponent } from './dashboard/team/team.component';
import { TeamDashboardComponent } from './dashboard/team-dashboard/team-dashboard.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';

// Material Import
import { A11yModule } from '@angular/cdk/a11y';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { AssignRandomTaskComponent } from './dashboard/dashboard-inbox/assign-random-task/assign-random-task.component';
import { TasksListComponent } from './dashboard/dashboard-inbox/tasks-list/tasks-list.component';
import { NoTeamComponent } from './dashboard/dashboard-inbox/no-team/no-team.component';
import { FacilitatorViewComponent } from './dashboard/dashboard-inbox/facilitator-view/facilitator-view.component';
import { TaskViewComponent } from './dashboard/dashboard-inbox/tasks-list/task-view/task-view.component';
import { TasksBoardComponent } from './dashboard/tasks-board/tasks-board.component';
import { TaskDetailModalComponent } from './dashboard/dashboard-inbox/facilitator-view/task-detail-modal/task-detail-modal.component';
import { AddModalComponent } from './dashboard/resource-page/add-modal/app-add-modal.component';
import { ResourcePageComponent } from '../dashboard/dashboard/resource-page/resource-page.component';
import { AnnouncementComponent } from '../dashboard/dashboard/announcement/announcement.component';
import { AddAnnouncementModalComponent } from '../dashboard/dashboard/announcement/add-announcement-modal/add-announcement-modal.component';
import { BonusTaskComponent } from './dashboard/bonus-task/bonus-task.component';
import { AddBonusTaskModalComponent } from './dashboard/bonus-task/add-bonus-task-modal/add-bonus-task-modal.component';
import { UploadTaskModalComponent } from './dashboard/bonus-task/upload-task-modal/upload-task-modal.component';
import { BonusTaskViewModalComponent } from './dashboard/bonus-task/bonus-task-view-modal/bonus-task-view-modal.component';
import { LeaderboardViewComponent } from './dashboard/leaderboard/leaderboard.component';
@NgModule({
  declarations: [
    DashboardComponent,
    DashboardHeaderComponent,
    DashboardInboxComponent,
    DashboardClassesComponent,
    CreateClassComponent,
    ClassViewComponent,
    ClassDetailsComponent,
    InviteStudentsComponent,
    ClassMembersComponent,
    ClassAgendaComponent,
    UserComponent,
    JoinClassComponent,
    TeamComponent,
    AssignRandomTaskComponent,
    TasksListComponent,
    NoTeamComponent,
    FacilitatorViewComponent,
    TaskViewComponent,
    TasksBoardComponent,
    TaskDetailModalComponent,
    ResourcePageComponent,
    AddModalComponent,
    AnnouncementComponent,
    AddAnnouncementModalComponent,
    BonusTaskComponent,
    AddBonusTaskModalComponent,
    UploadTaskModalComponent,
    BonusTaskViewModalComponent,
    TeamDashboardComponent,
    LeaderboardViewComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
    MaterialFileInputModule,
  ],
})
export class DashboardModule {}
