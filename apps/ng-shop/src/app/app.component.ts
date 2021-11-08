import { Component, OnInit } from '@angular/core';
import { UsersService } from '@nagiub/users';

@Component({
  selector: 'ngshop-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  title = 'ng-shop';

  constructor(private _UserService:UsersService){}
  // initate app session
  ngOnInit(): void {
    this._UserService.initAppSession();
  }
}
