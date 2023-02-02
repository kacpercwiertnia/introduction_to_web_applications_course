import { Injectable } from '@angular/core';
import { ITrip } from '../app/model/itrip';
import { ITrips } from '../app/model/itrips';
import TripsJson from '../assets/trips.json'

@Injectable({
  providedIn: 'root'
})
export class ReadTripsService {
  trips: ITrips = TripsJson;
  allTrips: Array<ITrip> = this.trips.trips;

  constructor() { }

  getTrips(){
    return this.allTrips;
  }
}
