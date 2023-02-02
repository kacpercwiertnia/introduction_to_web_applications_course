import { Component, OnInit } from '@angular/core';
import { FirestoreServiceService } from '../firestore-service.service';
import { INewTrip } from '../model/inew-trip';

@Component({
  selector: 'app-all-trips',
  templateUrl: './all-trips.component.html',
  styleUrls: ['./all-trips.component.css']
})
export class AllTripsComponent implements OnInit{
  allTrips: INewTrip[] = [];
  highestPrice: number = 0;
  lowestPrice: number = 0;

  constructor(private firebaseService: FirestoreServiceService){}

  ngOnInit(){
    this.firebaseService.getTrips().subscribe((t:any) => {this.allTrips = t;this.updateTripsList();})
  }

  updateTripsList(): void{
    let prices: Array<number> = this.allTrips.map( trip => trip.price)
    if( prices.length == 1 )
    {
      this.lowestPrice = -1;
      this.highestPrice = -1;
    }
    else{
      let cmp: number = prices[0];
      let flag: boolean = false;
      for( let el of prices ){
        if( el != cmp )
        {
          flag = true;
          break;
        }
      }

      if( flag )
      {
        this.lowestPrice = Math.min(...prices)
        this.highestPrice = Math.max(...prices)
      }
      else{
        this.lowestPrice = -1;
        this.highestPrice = -1;
      }
    }
  }

  onChangeList(index: number): void{
    this.firebaseService.removeTrip(index);
  }

  onAddNewTrip(newTrip: INewTrip): void{
    this.firebaseService.addTrip(newTrip);
  }

}
