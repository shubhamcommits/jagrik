import { Component, OnInit, ChangeDetectionStrategy, Inject, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-bonus-task-view-modal',
  templateUrl: './bonus-task-view-modal.component.html',
  styleUrls: ['./bonus-task-view-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BonusTaskViewModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {

    console.log('====================================');
    console.log(this.data);
    console.log('====================================');
  }

}
