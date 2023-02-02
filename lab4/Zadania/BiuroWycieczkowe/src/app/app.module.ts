import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SingleTripComponent } from './single-trip/single-trip.component';
import { AllTripsComponent } from './all-trips/all-trips.component';
import { TripAddingFormComponent } from './trip-adding-form/trip-adding-form.component';
import { TripRatingComponent } from './trip-rating/trip-rating.component';
import { TripsCartComponent } from './trips-cart/trips-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    SingleTripComponent,
    AllTripsComponent,
    TripAddingFormComponent,
    TripRatingComponent,
    TripsCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
