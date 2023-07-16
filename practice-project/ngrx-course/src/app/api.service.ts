import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';
  private usersSubject = new BehaviorSubject<any>([])
  public users$ = this.usersSubject.asObservable()

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUserById(id: number): any {
    let users = this.usersSubject.getValue()
    return users.find((element)=> element.id === id);
  }

  updateUser(userId: number, updatedUser: any): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.put<any>(url, updatedUser);
  }

  deleteUser(userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete<any>(url);
  }

  updateUserInArray(id: number, updatedUser: any) {
    let users = this.usersSubject.getValue()
    let index = users.findIndex((item)=> item.id === id)
    users[index] = updatedUser;
    this.setUsers(users)
  }

  deleteUserFromArray(id: number) {
    let users = this.usersSubject.getValue()
    let index = users.findIndex((item)=> item.id === id)
    users.splice(index, 1);
    this.setUsers(users)
  }

  setUsers(data){
    data.map((item, index)=>{
      item.id = index + 1;
    })
    this.usersSubject.next(data);
  }
}
