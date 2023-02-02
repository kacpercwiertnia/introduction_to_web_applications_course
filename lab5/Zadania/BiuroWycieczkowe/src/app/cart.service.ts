import { Injectable } from '@angular/core';
import { ICart } from './model/icart';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  stateOfCart: Array<Array<any>>;
  cartValue: number;
  numOfTrips: number;
  cart: ICart;
  
  constructor(){ 
    this.stateOfCart = [];
    this.cartValue = 0;
    this.cart = {
      value: 0,
      quantity: 0,
      state: []
    }
    this.numOfTrips = 0;
  }

  getCart(){
    return this.cart;
  }

  changeStateOfCart(tripAndNum: Array<any>){
    this.cartValue += tripAndNum[1] * tripAndNum[2];
    this.numOfTrips += tripAndNum[2];

    let found: boolean = false;

    for(let el of this.stateOfCart ){
      if( el[0] == tripAndNum[0] )
      {
        el[1] += tripAndNum[2];
        found = true;
        break;
      }
    }

    if( !found )
      this.stateOfCart.push([tripAndNum[0], tripAndNum[2]])

    let i: number = 0;
    for(let el of this.stateOfCart){
      if( el[1] == 0 )
      {
        this.stateOfCart.splice(i,1)
      }
      i+=1;
    }

    this.cart.value = this.cartValue;
    this.cart.state = this.stateOfCart;
    this.cart.quantity = this.numOfTrips;
  }

}
