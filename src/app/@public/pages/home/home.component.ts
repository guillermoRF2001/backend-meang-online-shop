import { UsersService } from '@core/services/users.service';
import { AuthService } from '@core/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private usersApi: UsersService, private auth: AuthService) { }

  ngOnInit(): void {
    // Imformacion que aparece en la consola sobre todos los usuarios y mas.

    // tslint:disable-next-line: deprecation
    this.usersApi.getUsers().subscribe( result => {
      console.log('getUsers -', result); // { status message users: []}
    });
/*
    // tslint:disable-next-line: deprecation
    this.auth.getMe().subscribe( result => {
      console.log('getMe -', result); // { status message user: {}}}
    });*/
  }

}
