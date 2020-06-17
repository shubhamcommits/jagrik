import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardClassesComponent } from './dashboard-classes.component';

describe('DashboardClassesComponent', () => {
  let component: DashboardClassesComponent;
  let fixture: ComponentFixture<DashboardClassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardClassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
