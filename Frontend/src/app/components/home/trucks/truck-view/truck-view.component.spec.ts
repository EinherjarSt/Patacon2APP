import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckViewComponent } from './truck-view.component';

describe('TruckViewComponent', () => {
  let component: TruckViewComponent;
  let fixture: ComponentFixture<TruckViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TruckViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TruckViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
