import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from './app.state';


export const selectAppState = createFeatureSelector<AppState>('app');

export const selectLoading = createSelector(
  selectAppState,
  (state: AppState) => state.loading
);

export const selectEditMode = createSelector(
  selectAppState,
  (state: AppState) => state.editMode
);

export const selectEditId = createSelector(
  selectAppState,
  (state: AppState) => state.editId
);

export const selectUsers = createSelector(
  selectAppState,
  (state: AppState) => state.users
);
