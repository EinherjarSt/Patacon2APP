import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryByProducerComponent } from './summary-by-producer.component';

describe('SummaryByProducerComponent', () => {
  let component: SummaryByProducerComponent;
  let fixture: ComponentFixture<SummaryByProducerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryByProducerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryByProducerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
