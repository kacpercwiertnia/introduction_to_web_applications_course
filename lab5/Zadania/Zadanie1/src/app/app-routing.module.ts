import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPhotosComponent } from './all-photos/all-photos.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { HomeComponent } from './home/home.component';
import { SinglePhotosComponent } from './single-photos/single-photos.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'photos/:id', component: SinglePhotosComponent},
  {path: 'home', component: HomeComponent},
  {path: 'posts', component: AllPostsComponent},
  {path: 'photos', component: AllPhotosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
