import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignRandomTaskComponent } from './assign-random-task.component';

describe('AssignRandomTaskComponent', () => {
  let component: AssignRandomTaskComponent;
  let fixture: ComponentFixture<AssignRandomTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignRandomTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignRandomTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
