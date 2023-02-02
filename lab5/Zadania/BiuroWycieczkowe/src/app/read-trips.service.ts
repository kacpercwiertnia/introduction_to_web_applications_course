import { Injectable } from '@angular/core';
import { ITrip } from '../app/model/itrip';
import { ITrips } from '../app/model/itrips';
import TripsJson from '../assets/trips.json'
import { IOpinion } from './model/iopinion';

@Injectable({
  providedIn: 'root'
})
export class ReadTripsService {
  trips: ITrips = TripsJson;
  allTrips: Array<ITrip> = this.trips.trips;
  allImages: Array<String>;
  quantities: Array<number>;
  opinions: Array<Array<IOpinion>>;

  constructor(){
    this.allImages = []
    for( let trip of this.allTrips){
      this.allImages.push(trip.images[0])
      this.allImages.push(trip.images[1])
      this.allImages.push(trip.images[2])
    }
    this.quantities = this.allTrips.map( trip => trip.quantity);
    this.opinions = this.allTrips.map( trip => []); //TUTAJ BD CZYTANIE OPINI Z BAZY; WYCIECZKI BD MIALY NOWA WLACIWOSC
    console.log(this.opinions)
  }

  getTrips(){
    return this.allTrips;
  }

  getTrip(index: number){
    return this.allTrips[index];
  }

  getQuantites(){
    return this.quantities;
  }

  getQuantity(index: number){
    return this.quantities[index];
  }

  addTrip(trip: ITrip){
    this.allTrips.push(trip);
    this.quantities.push(trip.quantity);
    this.opinions.push([])
  }

  removeTrip(index: number){
    this.allTrips = this.allTrips.slice(0, index).concat(this.allTrips.slice(index+1, this.allTrips.length));
    this.quantities = this.quantities.slice(0, index).concat(this.quantities.slice(index+1, this.quantities.length));
  }

  changeQuantity(index: number, numOfseats: number){
    this.quantities[index] += numOfseats;
  }

  getImages(){
    return this.allImages;
  }

  getOpinions(index: number){
    return this.opinions[index];
  }

  addOpinion(index: number, opinion: IOpinion){
    this.opinions[index].push(opinion);
  }

  getRating(index: number){
    let ratings = this.opinions[index].map( opinion => opinion.rating[0] );
    let sum = ratings.reduce( (a,b) => a+b, 0);

    return [ratings.length, sum/ratings.length];
  }
}
