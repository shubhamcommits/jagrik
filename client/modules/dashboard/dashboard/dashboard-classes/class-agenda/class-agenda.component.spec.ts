import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassAgendaComponent } from './class-agenda.component';

describe('ClassAgendaComponent', () => {
  let component: ClassAgendaComponent;
  let fixture: ComponentFixture<ClassAgendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassAgendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
