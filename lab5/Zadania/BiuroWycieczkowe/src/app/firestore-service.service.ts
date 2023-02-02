/*import { EventEmitter, Injectable, Output } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IOpinion } from './model/iopinion';
import { ITrip } from './model/itrip';

@Injectable({
  providedIn: 'root'
})
export class FirestoreServiceService {

  @Output() tripsUpdatedEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() quantitiesUpdatedEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() reviewsUpdatedEvent: EventEmitter<any> = new EventEmitter<any>();

  private tripsRef: AngularFirestoreCollection;
  private trips: any = [];
  private quantities: any = [];
  private reviews: any = [];
  
  constructor(private db: AngularFirestore){
    this.tripsRef = this.db.collection('trips');
    this.tripsRef.snapshotChanges().subscribe((res)=>{
      this.trips = []
      res.forEach((r)=>{
        let data = r.payload.doc.data()
        this.trips.push(data)
        this.quantities.push([data['id'], data['quantity']])
        this.reviews.push([data['id'], data['reviews']])
      
        this.prepareTrips()
      })
      
      this.tripsUpdatedEvent.emit(this.trips);
      this.quantitiesUpdatedEvent.emit(this.quantities);
      this.reviewsUpdatedEvent.emit(this.reviews);
    })
  }

  prepareTrips(){
    this.trips=this.trips.sort((a: { id: number; },b: { id: number; })=>{return a.id-b.id})
  }

  getTrips(){
    return this.trips;
  }

  getTrip(index: number){
    for( let trip of this.trips){
      if( trip.id == index ){
        return trip;
      }
    }
  }

  removeTrip(index: number){
    this.trips.doc(index.toString()).delete()
  }

  addTrip(trip: ITrip){
    trip.id = this.trips[this.trips.length-1].id+1;
    this.tripsRef.doc(trip.id.toString()).set(trip)
  }

  getQuantites(){
    return this.quantities;
  }

  getQuantity(index: number){
    for( let el of this.quantities){
      if( el[0] == index ){
        return el[1];
      }
    }
  }

  changeQuantity(index: number, numOfseats: number){
    for( let el of this.quantities){
      if( el[0] == index ){
        el[1] += numOfseats;
        break;
      }
    }
  }

  getReviews(index: number){
    for( let el of this.reviews){
      if( el[0] == index ){
        return el[1];
      }
    }
  }

  addReview(index: number, review: IOpinion){
    let newReviews;
    let newRating;
    let newNumOfReviews;

    for( let el of this.reviews){
      if( el[0] == index ){
        el[1].push(review);
        newReviews = el[1];
        break;
      }
    }

    for(let trip of this.trips ){
      if( trip.id == index){
        trip.numOfReviews += 1
        newNumOfReviews = trip.numOfReviews
        if( trip.rating == 0 ){
          trip.rating = review.rating
        }
        else{
          trip.rating = (trip.rating + review.rating)/2;
        }
        newRating = trip.rating;
        break;
      }
    }

    this.tripsRef.doc(index.toString()).update({numOfReviews: newNumOfReviews})
    this.tripsRef.doc(index.toString()).update({rating: newRating})
    this.tripsRef.doc(index.toString()).update({reviews: newReviews})
  }

  getNumOfReviews(index: number){
    for( let trip of this.trips){
      if( trip.id == index ){
        return trip.numOfReviews;
      }
    }
  }

  getRating(index: number){
    for( let trip of this.trips){
      if( trip.id == index ){
        return trip.rating;
      }
    }
  }
}
*/