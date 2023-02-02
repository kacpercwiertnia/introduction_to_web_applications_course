import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NowyKomponentComponent } from './nowy-komponent.component';

describe('NowyKomponentComponent', () => {
  let component: NowyKomponentComponent;
  let fixture: ComponentFixture<NowyKomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NowyKomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NowyKomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
