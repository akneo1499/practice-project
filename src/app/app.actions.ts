import { createAction, props } from '@ngrx/store';
import { User } from './app.state';

export const loadUserData = createAction('[App] Load User Data');
export const loadUserDataSuccess = createAction('[App] Load User Data Success', props<{ users: any[] }>());
export const loadUserDataFailure = createAction('[App] Load User Data Failure', props<{ error: any }>());

export const toggleEditMode = createAction('[App] Toggle Edit Mode', props<{ editId: number }>());

export const addUser = createAction('[App] Add User', props<{ user: any }>());

export const updateUserInArray = createAction('[App] Update User In Array',props<{ updatedUser: any }>());
export const deleteUserFromArray = createAction('[App] Delete User From Array',props<{ id: number }>());

export const updateUser = createAction('[App] Update User', props<{ id: number; updatedUser: any }>());
export const updateUserSuccess = createAction('[App] Update User Success');
export const updateUserFailure = createAction('[App] Update User Failure', props<{ error: any }>());
export const saveChanges = createAction('[App] Save Changes', props<{ updatedUser: User }>());

export const deleteUser = createAction('[App] Delete User', props<{ id: number }>());
export const deleteUserSuccess = createAction('[App] Delete User Success');
export const deleteUserFailure = createAction('[App] Delete User Failure', props<{ error: any }>());
