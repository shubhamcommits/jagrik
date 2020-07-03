import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-class-view',
  templateUrl: './class-view.component.html',
  styleUrls: ['./class-view.component.scss'],
  styles: [
    `
      :host {
        display: inline-block;
        width: 100%;
      }
    `,
  ],
})
export class ClassViewComponent implements OnInit {
  constructor() {}

  @Input('class') class: any;

  ngOnInit(): void {}
}
