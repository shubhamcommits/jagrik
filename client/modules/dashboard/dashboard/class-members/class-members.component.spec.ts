import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassMembersComponent } from './class-members.component';

describe('ClassMembersComponent', () => {
  let component: ClassMembersComponent;
  let fixture: ComponentFixture<ClassMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
