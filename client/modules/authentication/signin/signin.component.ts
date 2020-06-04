import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(
    private _Location: Location
  ) { }

  ngOnInit(): void {
  }

  backClicked() {
    this._Location.back();
  }

}
