import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitatorViewComponent } from './facilitator-view.component';

describe('FacilitatorViewComponent', () => {
  let component: FacilitatorViewComponent;
  let fixture: ComponentFixture<FacilitatorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilitatorViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilitatorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
