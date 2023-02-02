import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTripsComponent } from './all-trips/all-trips.component';
import { HomeCardComponent } from './home-card/home-card.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SingleTripPageComponent } from './single-trip-page/single-trip-page.component';
import { TripAddingFormComponent } from './trip-adding-form/trip-adding-form.component';
import { TripsCartComponent } from './trips-cart/trips-cart.component';
import { AuthGuard } from './auth.guard';
import { AuthAdminGuard } from './auth-admin.guard';
import { AuthGuestGuard } from './auth-guest.guard';
import { UsersListComponent } from './users-list/users-list.component';
import { AuthManagerGuard } from './auth-manager.guard';
import { TripEditComponent } from './trip-edit/trip-edit.component';
import { Page404Component } from './page404/page404.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'trips/:id', component: SingleTripPageComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeCardComponent},
  {path: 'trips', component: AllTripsComponent},
  {path: 'cart', component: TripsCartComponent, canActivate: [AuthGuard]},
  {path: 'add', component: TripAddingFormComponent, canActivate: [AuthManagerGuard]},
  {path: 'sign-in', component: SignInComponent, canActivate: [AuthGuestGuard]},
  {path: 'register-user', component: SignUpComponent, canActivate: [AuthGuestGuard]},
  {path: 'userslist', component: UsersListComponent, canActivate: [AuthAdminGuard]},
  {path: 'trip-edit/:id', component: TripEditComponent, canActivate: [AuthManagerGuard]},
  {path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
