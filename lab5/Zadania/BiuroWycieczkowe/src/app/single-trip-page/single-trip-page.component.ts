import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';
import { IOpinion } from '../model/iopinion';
import { ITrip } from '../model/itrip';
import { ReadTripsService } from '../read-trips.service';

@Component({
  selector: 'app-single-trip-page',
  templateUrl: './single-trip-page.component.html',
  styleUrls: ['./single-trip-page.component.css']
})
export class SingleTripPageComponent {
  id!: number;
  tripListService: ReadTripsService;
  cartService: CartService;
  trip: ITrip;
  numOfTrip: number = 0;
  quantity: number;
  opinions: Array<IOpinion>;
  rating: number;
  numOfRatings: number;
  slideIndex: number = 1;

  constructor(cartService: CartService, tripListService: ReadTripsService, private route: ActivatedRoute){
    this.route.params.subscribe(param => this.id = param['id'])
    this.tripListService = tripListService;
    this.cartService = cartService;
    this.trip = this.tripListService.getTrip(this.id);
    this.quantity = this.tripListService.getQuantity(this.id);
    this.opinions = this.tripListService.getOpinions(this.id);
    this.numOfRatings = this.tripListService.getRating(this.id)[0];
    this.rating = this.tripListService.getRating(this.id)[1];
  }

  ngOnInit(): void{
    this.numOfTrip = this.quantity;
  }

  addTrip(): void{
    if( this.numOfTrip > 0 )
    {
      this.numOfTrip -= 1;
      this.cartService.changeStateOfCart([this.trip.name, this.trip.price, 1])
      this.tripListService.changeQuantity(this.id, -1);
    }
  }

  removeTrip(): void{
    if( this.numOfTrip < this.trip.quantity )
    {
      this.numOfTrip += 1;
      this.cartService.changeStateOfCart([this.trip.name, this.trip.price, -1])
      this.tripListService.changeQuantity(this.id, 1);
    }

  }

  onChangeRating(index: number): void{
    this.numOfRatings = this.tripListService.getRating(this.id)[0];
    this.rating = this.tripListService.getRating(this.id)[1];
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
