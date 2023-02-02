import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITrip } from '../model/itrip';
import { CartService } from '../cart.service';

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
    image: "",
  }
  @Output() updateSumOfTrips: EventEmitter<Array<number>> = new EventEmitter<Array<number>>();
  @Output() updateTripsList: EventEmitter<number> = new EventEmitter<number>();
  numOfTrip: number = 0;
  noAdding: boolean = false;
  noRemoving: boolean = true;
  service;

  constructor(service: CartService){
    this.service = service;
  }

  ngOnInit(): void{
    this.numOfTrip = this.trip.quantity;
  }

  deleteTrip(): void{
    this.updateSumOfTrips.emit([-(this.trip.quantity - this.numOfTrip), this.index])
    this.updateTripsList.emit(this.index)
    this.service.changeStateOfCart([this.trip.name, this.trip.price, -(this.trip.quantity - this.numOfTrip)])
  }

  addTrip(): void{
    this.noRemoving = false;

    if( this.numOfTrip > 0 )
    {
      this.numOfTrip -= 1;
      this.updateSumOfTrips.emit([1,this.index])
      this.service.changeStateOfCart([this.trip.name, this.trip.price, 1])
    }
    
    if( this.numOfTrip == 0 )
      this.noAdding = true;
  }

  removeTrip(): void{
    this.noAdding = false;

    if( this.numOfTrip < this.trip.quantity )
    {
      this.numOfTrip += 1;
      this.updateSumOfTrips.emit([-1,this.index])
      this.service.changeStateOfCart([this.trip.name, this.trip.price, -1])
    }

    if( this.numOfTrip == this.trip.quantity )
      this.noRemoving = true;
  }
}
