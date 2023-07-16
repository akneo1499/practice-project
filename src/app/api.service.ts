import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';
  private usersSubject = new BehaviorSubject<any[]>([]);
  public users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<any> {
    return this.users$.pipe(
      map(users => users.find(user => user.id === id))
    );
  }

  updateUser(updatedUser: any): Observable<any> {
    const url = `${this.apiUrl}/${updatedUser.id}`;
    return this.http.put<any>(url, updatedUser);
  }

  deleteUser(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }

  updateUserInArray(id: number, updatedUser: any) {
    let users = this.usersSubject.getValue();
    let index = users.findIndex(item => item.id === id);
    users[index] = updatedUser;
    this.setUsers(users);
  }

  deleteUserFromArray(id: number) {
    let users = this.usersSubject.getValue();
    let index = users.findIndex(item => item.id === id);
    users.splice(index, 1);
    this.setUsers(users);
  }

  setUsers(data: any[]) {
    data = data.map((item, index) => {
      item.id = index + 1;
      return item;
    });
    this.usersSubject.next(data);
  }
}
