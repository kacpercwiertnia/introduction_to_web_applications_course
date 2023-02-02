import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { max, Observable } from 'rxjs';
import { INewTrip } from './model/inew-trip';
import { IOpinion } from './model/iopinion';

@Injectable({
  providedIn: 'root'
})
export class FirestoreServiceService {
  constructor( private db: AngularFirestore){
    this.trips = this.db.collection('trips').valueChanges();
    this.trips.subscribe((t:any) =>{
      this.tripsList = t;
      this.quantities = this.tripsList.map(trip => [trip.id, trip.quantity]);
    });
  }

  trips: Observable<any[]>;
  tripsList: INewTrip[] = [];
  quantities: Array<Array<number>> = [];

  getTrips(){
    return this.trips;
  }

  addTrip(trip: INewTrip){
    let newId =  Math.max(...this.tripsList.map(el => el.id))+1;
    this.db.collection('trips').doc(newId.toString()).set({
      id: newId,
      name: trip.name,
      destination: trip.destination,
      start: trip.start,
      end: trip.end,
      price: trip.price,
      quantity: trip.quantity,
      description: trip.description,
      images: trip.images,
      numOfReviews: trip.numOfReviews,
      rating: trip.rating,
      reviews: trip.reviews
    })
    this.quantities.push([newId, trip.quantity])
  }

  editTrip(trip: INewTrip){
    this.db.collection('trips').doc(trip.id.toString()).update({
      name: trip.name,
      destination: trip.destination,
      start: trip.start,
      end: trip.end,
      price: trip.price,
      quantity: trip.quantity,
      description: trip.description,
      images: trip.images,
    })
    for(let i = 0; i < this.quantities.length; i++){
      if(this.quantities[i][0] == trip.id ){
        this.quantities[i][1] = trip.quantity;
        break;
      }
    }
  }

  removeTrip(id: number){
    this.db.collection('trips').doc(id.toString()).delete();

    for(let i = 0; i < this.tripsList.length; i++){
      if(this.tripsList[i].id == id ){
        this.tripsList.splice(i,1);
        this.quantities.splice(i,1);
        break;
      }
    }
  }

  getQuantity(id: number){
    for(let i = 0; i < this.quantities.length; i++){
      if(this.quantities[i][0] == id ){
        return this.quantities[i][1];
      }
    }
    return 0;
  }

  changeQuantity(id: number, numOfSeats: number){
    for(let i = 0; i < this.quantities.length; i++){
      if(this.quantities[i][0] == id ){
        this.quantities[i][1] += numOfSeats;
        break;
      }
    }
  }

  addOpinion(id: number, opinion: IOpinion){
    for(let i = 0; i < this.tripsList.length; i++){
      if(this.tripsList[i].id == id ){
        this.tripsList[i].reviews.push(opinion);
        this.tripsList[i].numOfReviews += 1;
        this.tripsList[i].rating = this.tripsList[i].numOfReviews == 1 ? opinion.rating[0] : (this.tripsList[i].rating*(this.tripsList[i].numOfReviews-1)+opinion.rating[0])/this.tripsList[i].numOfReviews;
        this.db.collection('trips').doc(id.toString()).update({
          reviews: this.tripsList[i].reviews,
          numOfReviews: this.tripsList[i].numOfReviews,
          rating: this.tripsList[i].rating
        })
        break;
      }
    }
  }

  addOpinion2(id: number, opinion: IOpinion){
    for(let i = 0; i < this.tripsList.length; i++){
      if(this.tripsList[i].id == id ){
        this.tripsList[i].reviews.push(opinion);
        this.db.collection('trips').doc(id.toString()).update({
          reviews: this.tripsList[i].reviews
        })
        break;
      }
    }
  }
}
