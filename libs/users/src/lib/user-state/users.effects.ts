import { Injectable } from '@angular/core';
import { UsersService } from '../services/users.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { LocalStorageService } from '../services/local-storage.service';

import * as UsersActions from './users.actions';

@Injectable()
export class UsersEffects {

    buildUserSession$ = createEffect( ()=> this.actions$.pipe(
        ofType(UsersActions.buildUserSession),
        concatMap( ()=>{
            if(this.localStorage.isValidToken()){
                // we want to grap user from user service
                const userId = this.localStorage.getUserIdFromToken();
                if(userId){
                    return this.userService.getUser(userId).pipe(
                        map( (user)=>{
                            return UsersActions.buildUserSessionSuccess({user:user})
                        } ),
                        catchError(()=>of(UsersActions.buildUserSessionFailure())
                        )
                    )
                }
                else{
                    return of(UsersActions.buildUserSessionFailure())
                }
            }
            else{
                //call an action
                return of(UsersActions.buildUserSessionFailure())
                // here we executing it so we will use it as function not as property
                //  so we will ask the type of the action if we did it as property 


            }
        } )
    ) )

    constructor(private readonly actions$: Actions ,
        private localStorage:LocalStorageService,
        private userService:UsersService) {}
}
