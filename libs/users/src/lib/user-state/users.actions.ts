import { createAction, props } from '@ngrx/store';
import { User } from '../models/user';

export const buildUserSession = createAction('[users] build user session')


export const buildUserSessionSuccess = createAction('[users] build user session Success', props<{ user: User }>());

export const buildUserSessionFailure = createAction('[users] build user session Failure');
