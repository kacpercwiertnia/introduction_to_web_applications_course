import { Injectable, NgZone } from '@angular/core';
import { User } from '../app/model/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private userService: UserServiceService
  ) { 
    this.afAuth.authState.subscribe((user) => {
      if (user){
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });

    this.user = this.afs.collection('users').valueChanges();
    this.user.subscribe((t:any) =>{
      this.userList = t;
    });
  }

  user: Observable<any[]>;
  userList: User[] = [];

  SignIn(email: string, password: string){
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        //this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if(user) {
            this.router.navigate(['home']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SignUp(name: string, email: string, password: string){
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user, name);
        this.router.navigate(['home']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  getUser(){
    const user = JSON.parse(localStorage.getItem('user')!);
    if( user !== null ){
      for( let el of this.userList ){
        if( el.uid === user.uid){
          return el
        }
      }
      return null;
    }
    return null;
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ? true : false;
  }

  get isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    if( user !== null ){
      for( let el of this.userList ){
        if( el.uid === user.uid){
          if( el.role === "admin"){
            return true;
          }
          return false;
        }
      }
      return false;
    }
    return false;
  }

  get isManager(): boolean{
    const user = JSON.parse(localStorage.getItem('user')!);
    if( user !== null ){
      for( let el of this.userList ){
        if( el.uid === user.uid ){
          if( el.role === "manager"){
            return true;
          }
          return false;
        }
      }
      return false;
    }
    return false;
  }

  get isBanned(): boolean{
    const user = JSON.parse(localStorage.getItem('user')!);
    if( user !== null ){
      for( let el of this.userList ){
        if( el.uid === user.uid ){
          return el.banned
        }
      }
      return false;
    }
    return false;
  }

  SetUserData(user: any, name: string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      name: name,
      role: "regular",
      trips: [],
      banned: false
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}
