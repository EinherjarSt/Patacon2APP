import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGpsComponent } from './edit-gps.component';

describe('EditGpsComponent', () => {
  let component: EditGpsComponent;
  let fixture: ComponentFixture<EditGpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
