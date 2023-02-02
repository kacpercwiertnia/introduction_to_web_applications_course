import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripAddingFormComponent } from './trip-adding-form.component';

describe('TripAddingFormComponent', () => {
  let component: TripAddingFormComponent;
  let fixture: ComponentFixture<TripAddingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripAddingFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripAddingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
