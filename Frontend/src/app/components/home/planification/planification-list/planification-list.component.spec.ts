import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificationListComponent } from './planification-list.component';

describe('PlanificationListComponent', () => {
  let component: PlanificationListComponent;
  let fixture: ComponentFixture<PlanificationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanificationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
