import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User, UsersService } from '@nagiub/users';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'admin-user-list',
    templateUrl: './user-list.component.html',
    styles: []
})
export class UserListComponent implements OnInit , OnDestroy {
  users: User[] = [];
  endSubject$ :Subject<any> = new Subject()

    constructor(
        private usersService: UsersService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    ngOnInit(): void {
      this._getUsers()
      
    }
    ngOnDestroy(){
      this.endSubject$.next();
      this.endSubject$.complete();
    }
  private _getUsers() {
    this.usersService.getUsers().pipe(takeUntil(this.endSubject$)).subscribe((user) => {
      this.users = user;
    });
  
  }
  // getCountryName(countryKey: string) {
  //   return this.usersService.getCountry(countryKey);
  // }
  Updateuser(userid: string) {
    this.router.navigateByUrl(`users/form/${userid}`);
  }
    deleteuser(userId: string) {
        this.confirmationService.confirm({
            message: 'Do you want to Delete this User?',
            header: 'Delete User',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.usersService.deleteUser(userId).pipe(takeUntil(this.endSubject$)).subscribe(
                    () => {
                        this._getUsers();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'User is deleted!'
                        });
                    },
                    () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'User is not deleted!'
                        });
                    }
                );
            }
        });
    }
}
