import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePhotosComponent } from './single-photos.component';

describe('SinglePhotosComponent', () => {
  let component: SinglePhotosComponent;
  let fixture: ComponentFixture<SinglePhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglePhotosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglePhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
