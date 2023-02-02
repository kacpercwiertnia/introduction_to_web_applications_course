import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { ICart } from '../model/icart';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isMenuOpen: boolean = true;
  cartValue: number = 0;
  cart: ICart;
  service;

  constructor(service: CartService){
    this.service = service;
    this.cart = service.getCart();
  }

  toggleMenu(): void{
    this.isMenuOpen = !this.isMenuOpen;
  }
}
