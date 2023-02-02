import { Component } from '@angular/core';
import { ITrip } from '../model/itrip';
import { ReadTripsService } from "../read-trips.service"

@Component({
  selector: 'app-all-trips',
  templateUrl: './all-trips.component.html',
  styleUrls: ['./all-trips.component.css']
})
export class AllTripsComponent {
  allTrips: Array<ITrip>;
  allImages: Array<string>;
  highestPrice: number = 0;
  lowestPrice: number = 0;
  sumOfTrips: number = 0;
  displayForm: Array<boolean> = [false];
  
  constructor(service: ReadTripsService){
    this.allTrips = service.getTrips();
    this.allImages = this.allTrips.map( trip => trip.image )
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
    this.allTrips = this.allTrips.slice(0, index).concat(this.allTrips.slice(index+1, this.allTrips.length))
    this.updateTripsList();
  }

  onChangeSum(numTipAndIndex: Array<number>): void{
    this.sumOfTrips += numTipAndIndex[0];
  }

  onAddNewTrip(newTrip: ITrip): void{
    this.allTrips.push(newTrip);
    this.updateTripsList();
  }

  onShowForm(): void{
    if( this.displayForm[0] )
      this.displayForm = [false]
    else
      this.displayForm = [true]
  }

}
