import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ITrip } from '../model/itrip';

function beforeTodayValidator(){
  return (control:AbstractControl): ValidationErrors|null=>{
    const date = new Date();

    if( control.value != null )
    {
      const year = parseInt(control.value.substr(0,4));
      const month = parseInt(control.value.substr(5,2))-1;
      const day = parseInt(control.value.substr(8,2));

      if( year > date.getFullYear() )
        return null;
      else if( year == date.getFullYear() && month > date.getMonth() )
        return null;
      else if( year == date.getFullYear() && month == date.getMonth() && day >= date.getDate() )
        return null;
    }
    return {dateFromPast:true};
  }
}

@Component({
  selector: 'app-trip-adding-form',
  templateUrl: './trip-adding-form.component.html',
  styleUrls: ['./trip-adding-form.component.css']
})
export class TripAddingFormComponent {
  @Output() addNewTrip: EventEmitter<ITrip> = new EventEmitter<ITrip>();
  @Input() images: Array<string> = [];
  @Input() displayForm: Array<boolean> = [false];
  modelForm: FormGroup = this.formBuilder.group({
    name: new FormControl('', Validators.required ),
    destination: new FormControl('', Validators.required),
    start: new FormControl('', [Validators.required, beforeTodayValidator()]),
    end: new FormControl('', [Validators.required, beforeTodayValidator()]),
    price: new FormControl('', [Validators.required, Validators.pattern("^[1-9]{1}[0-9]{0,}$")]),
    quantity: new FormControl('', [Validators.required, Validators.pattern("^[1-9]{1}[0-9]{0,}$")] ),
    description: new FormControl('', Validators.required ),
    image: new FormControl('', Validators.required )
  });

  constructor(private formBuilder : FormBuilder) {}

  ngOnChanges(): void{
    if( this.displayForm[0] )
      this.modelForm.reset();
  }

  onSubmit(): void{
    let newTrip: ITrip = {
      name: this.modelForm.value.name,
      destination: this.modelForm.value.destination,
      start: this.modelForm.value.start.substr(8,2) + '-' + this.modelForm.value.start.substr(5,2) + '-' + this.modelForm.value.start.substr(0,4),
      end: this.modelForm.value.end.substr(8,2) + '-' + this.modelForm.value.end.substr(5,2) + '-' + this.modelForm.value.end.substr(0,4),
      price: this.modelForm.value.price,
      quantity: this.modelForm.value.quantity,
      description: this.modelForm.value.description,
      image: this.modelForm.value.image,
    }

    this.addNewTrip.emit(newTrip);
    this.modelForm.reset();
  }
}
