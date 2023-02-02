import { Component, Input } from '@angular/core';
import { CartService } from '../cart.service';
import { ICart } from '../model/icart';

@Component({
  selector: 'app-trips-cart',
  templateUrl: './trips-cart.component.html',
  styleUrls: ['./trips-cart.component.css']
})
export class TripsCartComponent {
  cartValue: number = 0;
  cart: ICart;
  service;

  constructor(service: CartService){
    this.service = service;
    this.cart = service.getCart();
  }

}
