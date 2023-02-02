import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITrip } from '../model/itrip';
import { CartService } from '../cart.service';
import { ReadTripsService } from '../read-trips.service';

@Component({
  selector: 'app-single-trip',
  templateUrl: './single-trip.component.html',
  styleUrls: ['./single-trip.component.css']
})
export class SingleTripComponent {
  @Input() index: number = 0;
  @Input() trip: ITrip = {
    name: "",
    destination: "",
    start: "",
    end: "",
    price: 0,
    quantity: 0,
    description: "",
    images: [],
  }
  @Output() updateTripsList: EventEmitter<number> = new EventEmitter<number>();
  numOfTrip: number = 0;
  cartService;
  tripListService;
  quantites;

  constructor(cartService: CartService, tripListService: ReadTripsService){
    this.cartService = cartService;
    this.tripListService = tripListService;
    this.quantites = tripListService.getQuantites();
  }

  ngOnInit(): void{
    this.numOfTrip = this.quantites[this.index];
  }

  deleteTrip(): void{
    this.updateTripsList.emit(this.index)
    this.cartService.changeStateOfCart([this.trip.name, this.trip.price, -(this.trip.quantity - this.numOfTrip)])
  }

  addTrip(): void{
    if( this.numOfTrip > 0 )
    {
      this.numOfTrip -= 1;
      this.cartService.changeStateOfCart([this.trip.name, this.trip.price, 1])
      this.tripListService.changeQuantity(this.index, -1);
    }
  }

  removeTrip(): void{
    if( this.numOfTrip < this.trip.quantity )
    {
      this.numOfTrip += 1;
      this.cartService.changeStateOfCart([this.trip.name, this.trip.price, -1])
      this.tripListService.changeQuantity(this.index, 1);
    }

  }
}
