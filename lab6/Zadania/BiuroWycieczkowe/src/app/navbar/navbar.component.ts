import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
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

  constructor(service: CartService, public authService: AuthService){
    this.service = service;
    this.cart = service.getCart();
  }

  toggleMenu(): void{
    this.isMenuOpen = !this.isMenuOpen;
  }
}
