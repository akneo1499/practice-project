import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable, throwError } from 'rxjs';
import { tap, finalize, catchError } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.scss']
})
export class DataDisplayComponent implements OnInit {
  loading = false;
  editMode = false;
  editId = -1;
  editForm: FormGroup;
  data$: Observable<any[]>;
  displayData$: Observable<any>;

  constructor(private apiService: ApiService) {
    this.editForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      username: new FormControl(''),
      phone: new FormControl('')
    });
  }

  ngOnInit() {
    this.loadData();
    this.displayData$ = this.apiService.users$
  }

  loadData() {
    this.loading = true;
    this.apiService.getUsers().pipe(
      tap((data) => {this.loading = false; this.apiService.setUsers(data)})
    ).subscribe((res) => {
      this.apiService.setUsers(res)
    })
  }

  toggleEditMode(id: number) {
    this.editMode = !this.editMode;
    this.editId = this.editMode ? id : -1;

    if (this.editMode) {
      const user = this.editId >= 0 ? this.apiService.getUserById(this.editId) : null;
      this.editForm.patchValue(user);
    }
  }

  saveChanges() {
    if (this.editForm.valid) {
      const updatedUser = this.editForm.value;
      const userId = this.apiService.getUserById(this.editId)?.id;
      this.loading = true;
      this.apiService.updateUser(userId, updatedUser)
        .pipe(
          tap(() => {
            this.apiService.updateUserInArray(this.editId, updatedUser);
            this.toggleEditMode(-1);
          }),
          catchError((error) => {
            console.error('Error occurred while updating user:', error);
            return throwError(error);
          }),
          finalize(()=> this.loading = false)
        )
        .subscribe();
    }
  }

  deleteUser(id: number) {
    const userId = this.apiService.getUserById(id)?.id;
    this.loading = true;
    this.apiService.deleteUser(userId)
      .pipe(
        tap(() => {this.apiService.deleteUserFromArray(userId)}),
        catchError((error) => {
          console.error('Error occurred while deleting user:', error);
          return throwError(error);
        }),
        finalize(()=> this.loading = false)
      ).subscribe()
  }
}
