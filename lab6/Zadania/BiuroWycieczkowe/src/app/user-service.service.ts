import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor( private db: AngularFirestore){
    this.users = this.db.collection('users').valueChanges();
    this.users.subscribe((t:any) =>{
      this.usersList = t;
    });
  }

  users: Observable<any[]>;
  usersList: User[] = [];

  getUsers(){
    return this.users;
  }

  banUser(user: User){
    this.db.collection('users').doc(user.uid.toString()).update({
      banned: true
    })
  }

  unbanUser(user: User){
    this.db.collection('users').doc(user.uid.toString()).update({
      banned: false
    })
  }

  changeRole(user: User, role: string){
    this.db.collection('users').doc(user.uid.toString()).update({
      role: role
    })
  }
}
