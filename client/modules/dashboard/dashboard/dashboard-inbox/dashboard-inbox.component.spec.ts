import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInboxComponent } from './dashboard-inbox.component';

describe('DashboardInboxComponent', () => {
  let component: DashboardInboxComponent;
  let fixture: ComponentFixture<DashboardInboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardInboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
