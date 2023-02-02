import { Component, Input } from '@angular/core';
import { User } from '../model/user';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.css']
})
export class UsersDetailsComponent {
  @Input() user: User = {
    uid: "",
    email: "",
    name: "",
    role: "",
    trips: [],
    banned: false
  };

  constructor(private userService: UserServiceService) { }

  ngOnInit() {
  }

  setBanned(){
    this.userService.banUser(this.user);
    this.user.banned = true;
  }

  setUnbanned(){
    this.userService.unbanUser(this.user);
    this.user.banned = false;
  }

  changeRole(event: any){
    this.userService.changeRole(this.user, event.target.value);
  }
}
