import { Component } from '@angular/core';
import { ITrip } from '../model/itrip';
import { ReadTripsService } from "../read-trips.service";

@Component({
  selector: 'app-all-trips',
  templateUrl: './all-trips.component.html',
  styleUrls: ['./all-trips.component.css']
})
export class AllTripsComponent {
  allTrips: Array<ITrip>;
  allQuantities: Array<number>
  highestPrice: number = 0;
  lowestPrice: number = 0;
  tripListService;

  constructor(tripListService: ReadTripsService){
    this.tripListService = tripListService;
    this.allTrips = this.tripListService.getTrips();
    this.allQuantities = this.tripListService.getQuantites();
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

  ngOnInit(): void{
    this.updateTripsList();
  }

  onChangeList(index: number): void{
    this.tripListService.removeTrip(index);
    this.allTrips = this.tripListService.getTrips();
    this.allQuantities = this.tripListService.getQuantites();
    this.updateTripsList();
  }

  onAddNewTrip(newTrip: ITrip): void{
    this.tripListService.addTrip(newTrip);
    this.allTrips = this.tripListService.getTrips();
    this.allQuantities = this.tripListService.getQuantites();
    this.updateTripsList();
  }

}
