import {
  Component,
  Inject,
  OnInit,
  Injector,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-modal',
  templateUrl: './app-add-modal.component.html',
  styleUrls: ['./app-add-modal.component.scss']
})
export class AddModalComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data) {}
  inputForm: FormGroup;
  ngOnInit(): void {}
}
