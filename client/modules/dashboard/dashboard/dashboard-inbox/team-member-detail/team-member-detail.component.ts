import {Component,OnInit,ChangeDetectionStrategy,Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-team-member-detail',
  templateUrl: './team-member-detail.component.html',
  styleUrls: ['./team-member-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamMemberDetailModalComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data) {}
  
  ngOnInit(): void {}
}
