import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as AppActions from './app.actions';
import { ApiService } from './api.service';

@Injectable()
export class AppEffects {
  loadUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.loadUserData),
      mergeMap(() =>
        this.apiService.getUsers().pipe(
          map(users => AppActions.loadUserDataSuccess({ users })),
          catchError(error => of(AppActions.loadUserDataFailure({ error })))
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AppActions.updateUser),
    mergeMap((action) =>
      this.apiService.updateUser(action.updatedUser).pipe(
        map(() => AppActions.updateUserSuccess()),
        catchError((error) => of(AppActions.updateUserFailure({ error })))
      )
    )
  )
);

deleteUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AppActions.deleteUser),
    mergeMap((action) =>
      this.apiService.deleteUser(action.id).pipe(
        map(() => AppActions.deleteUserSuccess()),
        catchError((error) => of(AppActions.deleteUserFailure({ error })))
      )
    )
  )
);

  constructor(private actions$: Actions, private apiService: ApiService) {}
}
