import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-class-view',
  templateUrl: './class-view.component.html',
  styleUrls: ['./class-view.component.scss']
})
export class ClassViewComponent implements OnInit {

  constructor() { }

  @Input('class') class: any

  ngOnInit(): void {
  }

}
