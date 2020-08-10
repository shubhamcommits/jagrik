import { Component, OnInit, ChangeDetectionStrategy, Inject, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pending-task-view-modal',
  templateUrl: './pending-task-view-modal.component.html',
  styleUrls: ['./pending-task-view-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PendingTaskViewModalComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit(): void {
    console.log('====================================');
    console.log(this.data);
    console.log('====================================');
  }
}
