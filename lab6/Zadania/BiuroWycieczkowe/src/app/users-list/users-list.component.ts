import { Component } from '@angular/core';
import { User } from '../model/user';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {
  users: User[] = [];

  constructor(private userService: UserServiceService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe((s:any) => this.users = s);
  }
}
