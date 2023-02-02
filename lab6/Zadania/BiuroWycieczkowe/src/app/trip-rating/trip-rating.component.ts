import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { FirestoreServiceService } from '../firestore-service.service';
import { IOpinion } from '../model/iopinion';

@Component({
  selector: 'app-trip-rating',
  templateUrl: './trip-rating.component.html',
  styleUrls: ['./trip-rating.component.css']
})
export class TripRatingComponent {
  ratingForm: FormGroup = this.formBuilder.group({
    purchased: new FormControl(''),
    opinion: new FormControl('', [Validators.required, Validators.pattern("^.{50,500}$") ] )
  });
  ratingForm2: FormGroup = this.formBuilder.group({
    purchased: new FormControl(''),
    opinion: new FormControl('', [Validators.required, Validators.pattern("^.{50,500}$") ] )
  });
  @Input() index: number = 0;
  hoverRating: number = 0;
  savedRating: number = 0;
  ratingTouched: boolean = false;
  firebaseService;

  constructor(private formBuilder : FormBuilder, firebaseService: FirestoreServiceService, public authService: AuthService){
    this.ratingForm.reset();
    this.firebaseService = firebaseService;
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
      nick: this.authService.getUser()?.name,
      purchased: newDate,
      rating: new Array(this.savedRating).fill(this.savedRating),
      opinion: this.ratingForm.value.opinion
    }
    this.firebaseService.addOpinion(this.index, newOpinion);
    this.ratingForm.reset();
    this.savedRating = 0;
  }

  onSubmit2(): void{
    let newDate: string;
    if( this.ratingForm.value.purchased == null)
      newDate = '';
    else
      newDate = this.ratingForm.value.purchased.substr(8,2) + '-' + this.ratingForm.value.purchased.substr(5,2) + '-' + this.ratingForm.value.purchased.substr(0,4);

    let newOpinion: IOpinion = {
      nick: this.authService.getUser()?.name,
      purchased: newDate,
      rating: [0,0,0,0,0],
      opinion: this.ratingForm.value.opinion
    }
    this.firebaseService.addOpinion2(this.index, newOpinion);
    this.ratingForm2.reset();
  }
}
