import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartService } from '../cart.service';
import { INewTrip } from '../model/inew-trip';
import { FirestoreServiceService } from '../firestore-service.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-single-trip',
  templateUrl: './single-trip.component.html',
  styleUrls: ['./single-trip.component.css']
})
export class SingleTripComponent {
  @Input() trip: INewTrip = {
    id: 0,
    name: "",
    destination: "",
    start: "",
    end: "",
    price: 0,
    quantity: 0,
    description: "",
    images: [],
    numOfReviews: 0,
    rating: 0,
    reviews: []
  }
  @Output() updateTripsList: EventEmitter<number> = new EventEmitter<number>();
  numOfTrip: number = 0;
  cartService;
  firebaseService;
  quantity: number = 0;

  constructor(cartService: CartService, firebaseService: FirestoreServiceService, public authService: AuthService){
    this.cartService = cartService;
    this.firebaseService = firebaseService;
  }

  ngOnInit(): void{
    this.firebaseService.trips.subscribe((t:any) => {
      this.quantity = this.firebaseService.getQuantity(this.trip.id);
      this.numOfTrip = this.quantity;
    })
  }

  deleteTrip(): void{
    this.cartService.changeStateOfCart([this.trip.name, this.trip.price, -(this.trip.quantity - this.numOfTrip)])
    this.updateTripsList.emit(this.trip.id)
  }
}