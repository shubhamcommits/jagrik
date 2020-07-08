import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoTeamComponent } from './no-team.component';

describe('NoTeamComponent', () => {
  let component: NoTeamComponent;
  let fixture: ComponentFixture<NoTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
