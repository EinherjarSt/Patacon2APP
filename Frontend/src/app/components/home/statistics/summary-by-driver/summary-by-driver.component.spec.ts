import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryByDriverComponent } from './summary-by-driver.component';

describe('SummaryByDriverComponent', () => {
  let component: SummaryByDriverComponent;
  let fixture: ComponentFixture<SummaryByDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryByDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryByDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
