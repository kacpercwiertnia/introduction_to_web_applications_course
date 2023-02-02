import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { FirestoreServiceService } from '../firestore-service.service';
import { INewTrip } from '../model/inew-trip';

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
  modelForm: FormGroup = this.formBuilder.group({
    name: new FormControl('', Validators.required ),
    destination: new FormControl('', Validators.required),
    start: new FormControl('', [Validators.required, beforeTodayValidator()]),
    end: new FormControl('', [Validators.required, beforeTodayValidator()]),
    price: new FormControl('', [Validators.required, Validators.pattern("^[1-9]{1}[0-9]{0,}$")]),
    quantity: new FormControl('', [Validators.required, Validators.pattern("^[1-9]{1}[0-9]{0,}$")] ),
    description: new FormControl('', Validators.required ),
    image: new FormControl('', Validators.required ),
    image2: new FormControl('', Validators.required ),
    image3: new FormControl('', Validators.required )
  });
  firebaseService;
  images: Array<String> = ["https://firebasestorage.googleapis.com/v0/b/biurowycieczkowe-4f16a.appspot.com/o/trips%2Falbatros_palace.jpeg?alt=media&token=fde189e5-2009-41f4-be22-e4f9b16f55dc", 
  "https://firebasestorage.googleapis.com/v0/b/biurowycieczkowe-4f16a.appspot.com/o/trips%2Falbatros_palace_2.jpeg?alt=media&token=6b987446-80ec-4962-a9de-e5a1db0f8d1a", 
  "https://firebasestorage.googleapis.com/v0/b/biurowycieczkowe-4f16a.appspot.com/o/trips%2Falbatros_palace_3.jpeg?alt=media&token=5a6eb508-c10d-496e-8cb3-20cb6c5ad88f",
  "https://firebasestorage.googleapis.com/v0/b/biurowycieczkowe-4f16a.appspot.com/o/trips%2Fallegro_isora.jpeg?alt=media&token=750ac964-5dd0-464b-a2da-ff813a0455a4", 
  "https://firebasestorage.googleapis.com/v0/b/biurowycieczkowe-4f16a.appspot.com/o/trips%2Fallegro_isora_2.jpeg?alt=media&token=66327763-301e-4db1-98ee-d9d77d73e855", 
  "https://firebasestorage.googleapis.com/v0/b/biurowycieczkowe-4f16a.appspot.com/o/trips%2Fallegro_isora_3.jpeg?alt=media&token=0f8ca397-8e85-487d-a3d6-8f8e2575f1da",
  "https://firebasestorage.googleapis.com/v0/b/biurowycieczkowe-4f16a.appspot.com/o/trips%2Fbahia_grand_principe_punta_cana.jpeg?alt=media&token=613e06db-fb20-4094-ac6f-e8631aacab26",
  "https://firebasestorage.googleapis.com/v0/b/biurowycieczkowe-4f16a.appspot.com/o/trips%2Fbahia_grand_principe_punta_cana_2.jpeg?alt=media&token=212901b7-5f9e-4454-93f1-d8f263828543",
  "https://firebasestorage.googleapis.com/v0/b/biurowycieczkowe-4f16a.appspot.com/o/trips%2Fbahia_grand_principe_punta_cana_3.jpeg?alt=media&token=b1e48457-cb34-40d0-9273-3131eab66577",
  "https://firebasestorage.googleapis.com/v0/b/biurowycieczkowe-4f16a.appspot.com/o/trips%2Fblue_bay_grand_esmeralda_2.jpeg?alt=media&token=f436fab3-95ce-4d83-968f-60e37f0689c3",
  "https://firebasestorage.googleapis.com/v0/b/biurowycieczkowe-4f16a.appspot.com/o/trips%2Fblue_bay_grand_esmeralda_3.jpeg?alt=media&token=5ba2fbfe-e88d-4a20-a33c-44522eaf2fdc",
  "https://firebasestorage.googleapis.com/v0/b/biurowycieczkowe-4f16a.appspot.com/o/trips%2Fblue_bay_grand_esmeralda_3.jpeg?alt=media&token=5ba2fbfe-e88d-4a20-a33c-44522eaf2fdc",
  "https://firebasestorage.googleapis.com/v0/b/biurowycieczkowe-4f16a.appspot.com/o/trips%2Fgrifid_bolero.jpeg?alt=media&token=cdb2c483-e60e-4f0b-8032-aa08216425e1",
  "https://firebasestorage.googleapis.com/v0/b/biurowycieczkowe-4f16a.appspot.com/o/trips%2Fgrifid_bolero_2.jpeg?alt=media&token=db3c1e5f-0ed6-4fe7-8ca0-05bccd3a5c6f",
  "https://firebasestorage.googleapis.com/v0/b/biurowycieczkowe-4f16a.appspot.com/o/trips%2Fgrifid_bolero_3.jpeg?alt=media&token=2a1e51c6-7e37-4661-b98e-b30a621163f0",
  "https://firebasestorage.googleapis.com/v0/b/biurowycieczkowe-4f16a.appspot.com/o/trips%2Fiberostar_las_dalias.jpeg?alt=media&token=f63c2eb1-28aa-4e06-85eb-85d07dac3354",
  "https://firebasestorage.googleapis.com/v0/b/biurowycieczkowe-4f16a.appspot.com/o/trips%2Fiberostar_las_dalias_2.jpeg?alt=media&token=142b29a1-c9bd-43f9-aaee-fe41f251b7e8",
  "https://firebasestorage.googleapis.com/v0/b/biurowycieczkowe-4f16a.appspot.com/o/trips%2Fiberostar_las_dalias_3.jpeg?alt=media&token=b71abe84-5002-49aa-b025-8f0972c13e29",
  "https://firebasestorage.googleapis.com/v0/b/biurowycieczkowe-4f16a.appspot.com/o/trips%2Fmitsis_norida_beach.jpeg?alt=media&token=959b775e-243c-43c8-9ad6-46668d50b704",
  "https://firebasestorage.googleapis.com/v0/b/biurowycieczkowe-4f16a.appspot.com/o/trips%2Fmitsis_norida_beach_2.jpeg?alt=media&token=3cdd0d56-36fb-4ed3-ba16-d49af609e42d",
  "https://firebasestorage.googleapis.com/v0/b/biurowycieczkowe-4f16a.appspot.com/o/trips%2Fmitsis_norida_beach_3.jpeg?alt=media&token=b2c1beb6-4382-4a03-98ea-2558926a1004",
  "https://firebasestorage.googleapis.com/v0/b/biurowycieczkowe-4f16a.appspot.com/o/trips%2Foz_side_premium.jpeg?alt=media&token=450442a7-84fd-4f26-82ff-3bb941a49ac9",
  "https://firebasestorage.googleapis.com/v0/b/biurowycieczkowe-4f16a.appspot.com/o/trips%2Foz_side_premium_2.jpeg?alt=media&token=13e2bc3d-7028-4200-ac69-af09176f1b4d",
  "https://firebasestorage.googleapis.com/v0/b/biurowycieczkowe-4f16a.appspot.com/o/trips%2Foz_side_premium_3.jpeg?alt=media&token=030f36e6-e1c4-46ca-9b59-5c06f76eed5f",
  "https://firebasestorage.googleapis.com/v0/b/biurowycieczkowe-4f16a.appspot.com/o/trips%2Fprimasol_el_mehdi.jpeg?alt=media&token=f19616ff-03d6-4c4b-a0e7-e71cc705cdba",
  "https://firebasestorage.googleapis.com/v0/b/biurowycieczkowe-4f16a.appspot.com/o/trips%2Fprimasol_el_mehdi_2.jpeg?alt=media&token=2734fc92-e721-4e96-9af8-4dcc9fdbe642",
  "https://firebasestorage.googleapis.com/v0/b/biurowycieczkowe-4f16a.appspot.com/o/trips%2Fprimasol_el_mehdi_2.jpeg?alt=media&token=2734fc92-e721-4e96-9af8-4dcc9fdbe642",
  "https://firebasestorage.googleapis.com/v0/b/biurowycieczkowe-4f16a.appspot.com/o/trips%2Frotana_salalah_resort.jpeg?alt=media&token=416e043e-1d35-4489-aa18-31ad98a09829",
  "https://firebasestorage.googleapis.com/v0/b/biurowycieczkowe-4f16a.appspot.com/o/trips%2Frotana_salalah_resort_2.jpeg?alt=media&token=d311ef20-ec5e-4617-925d-8c6f2b2737ac",
  "https://firebasestorage.googleapis.com/v0/b/biurowycieczkowe-4f16a.appspot.com/o/trips%2Frotana_salalah_resort_3.jpeg?alt=media&token=1bad666b-4fde-4eff-a63d-578b792e747e"];

  constructor(private formBuilder : FormBuilder, firebaseService: FirestoreServiceService){
    this.modelForm.reset();
    this.firebaseService = firebaseService;
  }

  onSubmit(): void{
    let newTrip: INewTrip = {
      id: 0,
      name: this.modelForm.value.name,
      destination: this.modelForm.value.destination,
      start: this.modelForm.value.start.substr(8,2) + '-' + this.modelForm.value.start.substr(5,2) + '-' + this.modelForm.value.start.substr(0,4),
      end: this.modelForm.value.end.substr(8,2) + '-' + this.modelForm.value.end.substr(5,2) + '-' + this.modelForm.value.end.substr(0,4),
      price: parseInt(this.modelForm.value.price, 10),
      quantity: parseInt(this.modelForm.value.quantity, 10),
      description: this.modelForm.value.description,
      images: [this.modelForm.value.image, this.modelForm.value.image2, this.modelForm.value.image3],
      numOfReviews: 0,
      rating: 0,
      reviews: []
    }
    this.firebaseService.addTrip(newTrip);
    this.modelForm.reset();
  }
}
