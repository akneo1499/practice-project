import { createReducer, on } from '@ngrx/store';
import * as AppActions from './app.actions';
import { AppState } from './app.state';

export const initialState: AppState = {
  loading: false,
  editMode: false,
  editId: -1,
  users: []
};

export const appReducer = createReducer(
  initialState,
 
  on(AppActions.loadUserData, (state) => ({
    ...state,
    loading: true
  })),
 
  on(AppActions.loadUserDataSuccess, (state, { users }) => ({
    ...state,
    loading: false,
    users
  })),
 
  on(AppActions.loadUserDataFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
 
  on(AppActions.toggleEditMode, (state, { editId }) => ({
    ...state,
    editMode: !state.editMode,
    editId: editId || -1
  })),
 
  on(AppActions.addUser, (state, { user }) => ({
    ...state,
    users: [...state.users, user]
  })),

  on(AppActions.updateUserInArray, (state, { updatedUser }) => ({
    ...state,
    users: state.users.map(user => (user.id === updatedUser.id ? updatedUser : user))
  })),

  on(AppActions.deleteUserFromArray, (state, { id }) => ({
    ...state,
    users: state.users.filter(user => user.id !== id)
  })),
 
  on(AppActions.updateUser, (state) => ({
    ...state,
    loading: true
  })),
 
  on(AppActions.updateUserSuccess, (state) => ({
    ...state,
    loading: false
  })),
 
  on(AppActions.updateUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
 
  on(AppActions.deleteUser, (state) => ({
    ...state,
    loading: true
  })),
 
  on(AppActions.deleteUserSuccess, (state) => ({
    ...state,
    // loading: false
  })),
 
  on(AppActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
