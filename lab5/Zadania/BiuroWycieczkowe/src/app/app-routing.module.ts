import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTripsComponent } from './all-trips/all-trips.component';
import { HomeCardComponent } from './home-card/home-card.component';
import { SingleTripPageComponent } from './single-trip-page/single-trip-page.component';
import { TripAddingFormComponent } from './trip-adding-form/trip-adding-form.component';
import { TripsCartComponent } from './trips-cart/trips-cart.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'trips/:id', component: SingleTripPageComponent},
  {path: 'home', component: HomeCardComponent},
  {path: 'trips', component: AllTripsComponent},
  {path: 'cart', component: TripsCartComponent},
  {path: 'add', component: TripAddingFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
