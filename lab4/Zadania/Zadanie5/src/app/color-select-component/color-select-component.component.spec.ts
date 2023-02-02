import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorSelectComponentComponent } from './color-select-component.component';

describe('ColorSelectComponentComponent', () => {
  let component: ColorSelectComponentComponent;
  let fixture: ComponentFixture<ColorSelectComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorSelectComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorSelectComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
