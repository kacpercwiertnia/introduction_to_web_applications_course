import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nowy-komponent',
  templateUrl: './nowy-komponent.component.html',
  styleUrls: ['./nowy-komponent.component.css']
})
export class NowyKomponentComponent {
  @Input() imie: string = "";
  @Input() nazwisko: string = "";
  @Input() tytul: string = "";
  a = 2+3;
  b = window.location.href;
}
