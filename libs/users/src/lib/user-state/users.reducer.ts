import { User } from '../models/user';
import { createReducer, on, Action } from '@ngrx/store';
import * as UsersActions from './users.actions';

export const USERS_FEATURE_KEY = 'users';

export interface UserState {
    user:User,
    isAuthenticated:boolean
}

export interface UsersPartialState {
    readonly [USERS_FEATURE_KEY]: UserState;
}

// default
export const initalUserState:UserState = {
    user:{},
    isAuthenticated:false
}

const userReducer = createReducer(initalUserState,on(UsersActions.buildUserSession , (state)=>({...state})),

on(UsersActions.buildUserSessionSuccess,(state , action)=>({...state , user:action.user , isAuthenticated:true} )),
on(UsersActions.buildUserSessionFailure,(state )=>({...state , user:{} , isAuthenticated:false} )),
)



export  function reducer(state: UserState | undefined, action: Action) {
    return userReducer(state, action);
}
