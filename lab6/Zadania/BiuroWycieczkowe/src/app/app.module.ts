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
import { NavbarComponent } from './navbar/navbar.component';
import { HomeCardComponent } from './home-card/home-card.component';
import { SingleTripPageComponent } from './single-trip-page/single-trip-page.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { environment } from '../app/environment';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthService } from './auth.service';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersDetailsComponent } from './users-details/users-details.component';
import { TripEditComponent } from './trip-edit/trip-edit.component';
import { Page404Component } from './page404/page404.component';

@NgModule({
  declarations: [
    AppComponent,
    SingleTripComponent,
    AllTripsComponent,
    TripAddingFormComponent,
    TripRatingComponent,
    TripsCartComponent,
    NavbarComponent,
    HomeCardComponent,
    SingleTripPageComponent,
    SignInComponent,
    SignUpComponent,
    UsersListComponent,
    UsersDetailsComponent,
    TripEditComponent,
    Page404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig ),
    AngularFirestoreModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
