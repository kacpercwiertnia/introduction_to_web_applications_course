import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { FirestoreServiceService } from '../firestore-service.service';
import { INewTrip } from '../model/inew-trip';
import { IOpinion } from '../model/iopinion';

@Component({
  selector: 'app-single-trip-page',
  templateUrl: './single-trip-page.component.html',
  styleUrls: ['./single-trip-page.component.css']
})
export class SingleTripPageComponent {
  id!: number;
  firebaseService: FirestoreServiceService;
  cartService: CartService;
  trip: INewTrip = {
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
  numOfTrip: number = 0;
  quantity: number = 0;
  slideIndex: number = 1;
  allTrips: Array<INewTrip> = [];

  constructor(cartService: CartService, firebaseService: FirestoreServiceService, private route: ActivatedRoute, public authService: AuthService){
    this.route.params.subscribe(param => this.id = param['id'])
    this.firebaseService = firebaseService;
    this.cartService = cartService;
  }

  ngOnInit(): void{
    this.firebaseService.getTrips().subscribe((t:any) => {
      this.allTrips = t;
      for( let trip of this.allTrips){
        if( trip.id == this.id ){
          this.trip = trip;
          break;
        }
      }
      this.quantity = this.firebaseService.getQuantity(this.id);
      this.numOfTrip = this.quantity;
    })
  }

  addTrip(): void{
    if( this.numOfTrip > 0 )
    {
      this.numOfTrip -= 1;
      this.cartService.changeStateOfCart([this.trip.name, this.trip.price, 1])
      this.firebaseService.changeQuantity(this.id, -1);
    }
  }

  removeTrip(): void{
    if( this.numOfTrip < this.trip.quantity )
    {
      this.numOfTrip += 1;
      this.cartService.changeStateOfCart([this.trip.name, this.trip.price, -1])
      this.firebaseService.changeQuantity(this.id, 1);
    }

  }

  plusSlide(index: number): void{
    this.showSlides(this.slideIndex+=index);
  }

  showSlides(index: number): void{
    if( index > this.trip.images.length )
    {
      this.slideIndex = 1
    }
    if( index < 1 ){
      this.slideIndex = this.trip.images.length
    }
  }
}
