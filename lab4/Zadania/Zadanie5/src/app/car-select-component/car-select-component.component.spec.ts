import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarSelectComponentComponent } from './car-select-component.component';

describe('CarSelectComponentComponent', () => {
  let component: CarSelectComponentComponent;
  let fixture: ComponentFixture<CarSelectComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarSelectComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarSelectComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
