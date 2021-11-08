import { Component } from '@angular/core';
import { AuthService } from '@nagiub/users';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent  {

  constructor(private authservice:AuthService) { }


  logOut(){
    this.authservice.logout();
  }


}
