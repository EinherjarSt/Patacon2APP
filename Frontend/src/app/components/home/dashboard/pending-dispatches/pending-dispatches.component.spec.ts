import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingDispatchesComponent } from './pending-dispatches.component';

describe('PendingDispatchesComponent', () => {
  let component: PendingDispatchesComponent;
  let fixture: ComponentFixture<PendingDispatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingDispatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingDispatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
