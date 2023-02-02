import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IOpinion } from '../model/iopinion';
import { ReadTripsService } from '../read-trips.service';

@Component({
  selector: 'app-trip-rating',
  templateUrl: './trip-rating.component.html',
  styleUrls: ['./trip-rating.component.css']
})
export class TripRatingComponent {
  ratingForm: FormGroup = this.formBuilder.group({
    nick: new FormControl('', Validators.required ),
    purchased: new FormControl(''),
    opinion: new FormControl('', [Validators.required, Validators.pattern("^.{50,500}$") ] )
  });
  @Input() index: number = 0;
  @Output() updateRating: EventEmitter<number> = new EventEmitter<number>();
  hoverRating: number = 0;
  savedRating: number = 0;
  ratingTouched: boolean = false;
  tripListService;

  constructor(private formBuilder : FormBuilder, tripListService: ReadTripsService){
    this.ratingForm.reset();
    this.tripListService = tripListService;
  }
  
  onHoverRating(index: number): void{
    if( this.savedRating == 0)
      this.hoverRating = index;
  }

  removeHoverRating(): void{
    if( this.savedRating == 0)
    {
      this.hoverRating = 0;
      this.ratingTouched = true;
    }
  }

  saveRating(index: number): void{
    this.savedRating = index;
    this.ratingTouched = false;
  }

  onSubmit(): void{
    let newDate: string;
    if( this.ratingForm.value.purchased == null)
      newDate = '';
    else
      newDate = this.ratingForm.value.purchased.substr(8,2) + '-' + this.ratingForm.value.purchased.substr(5,2) + '-' + this.ratingForm.value.purchased.substr(0,4);

    let newOpinion: IOpinion = {
      nick: this.ratingForm.value.nick,
      purchased: newDate,
      rating: new Array(this.savedRating).fill(this.savedRating),
      opinion: this.ratingForm.value.opinion
    }
    this.tripListService.addOpinion(this.index, newOpinion);
    this.ratingForm.reset();
    this.savedRating = 0;
    this.updateRating.emit(1);
  }
}
