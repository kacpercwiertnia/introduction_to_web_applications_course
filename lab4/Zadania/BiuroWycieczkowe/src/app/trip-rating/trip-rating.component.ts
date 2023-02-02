import { Component } from '@angular/core';

@Component({
  selector: 'app-trip-rating',
  templateUrl: './trip-rating.component.html',
  styleUrls: ['./trip-rating.component.css']
})
export class TripRatingComponent {
  hoverRating: number = 0;
  savedRating: number = 0;
  
  onHoverRating(index: number): void{
    if( this.savedRating == 0)
      this.hoverRating = index;
  }

  removeHoverRating(): void{
    if( this.savedRating == 0)
      this.hoverRating = 0;
  }

  saveRating(index: number): void{
    this.savedRating = index;
  }
}
