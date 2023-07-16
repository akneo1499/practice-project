import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { tap, finalize, catchError } from 'rxjs/operators';

import * as AppActions from '../app.actions';
import { AppState } from '../app.state';
import { selectEditId, selectEditMode, selectLoading, selectUsers } from '../app.selectors';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.scss']
})
export class DataDisplayComponent implements OnInit {
  loading$: Observable<boolean>;
  editMode$: Observable<boolean>;
  editId$: Observable<number>;
  displayData$: Observable<any[]>;
  editForm: FormGroup;
  editId: any;
  loading: boolean;

  constructor(private store: Store<AppState>, private apiService: ApiService) {
    this.editForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      username: new FormControl(''),
      phone: new FormControl('')
    });
  }

  ngOnInit() {
    this.loading$ = this.store.select(selectLoading);
    this.editMode$ = this.store.select(selectEditMode);
    this.editId$ = this.store.select(selectEditId);
    this.displayData$ = this.store.select(selectUsers);

    this.store.dispatch(AppActions.loadUserData());
  }

  toggleEditMode(id: number) {
    this.store.dispatch(AppActions.toggleEditMode({ editId: id }));
    if(id > 0){
      this.displayData$.subscribe(data => {
        const user = data.find(u => u.id === id);
        this.editForm.patchValue(user);
      });
    }
  }

  saveChanges() {
    if (this.editForm.valid) {
      let updatedUser = this.editForm.value;
      this.editId$.subscribe((id)=>{
        updatedUser.id = id;
      });
      this.apiService.updateUser(updatedUser).pipe(
        tap(() => {
          this.store.dispatch(AppActions.updateUserInArray({ updatedUser }));
          this.toggleEditMode(-1);
        }),
        catchError((error) => {
          console.error('Error occurred while updating user:', error);
          return throwError(error);
        }),
      )
        .subscribe();
    }
  }

  deleteUser(id: number) {
    this.apiService.getUserById(id).subscribe(user => {
      id = user.id
    });
    this.apiService.deleteUser(id)
      .pipe(
        tap(() => {
          this.store.dispatch(AppActions.deleteUserFromArray({ id: id }));
        }),
        catchError((error) => {
          console.error('Error occurred while deleting user:', error);
          return throwError(error);
        }),
      )
      .subscribe();
  }
}

