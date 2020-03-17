import { Injectable } from '@angular/core';
import {User} from '../models/user.model';
import {Quiz} from '../models/quiz.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl =  'http://localhost:9428/api/users';
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(this.usersUrl) ;
  }

  createUser(user: User) {
    this.http.post<User>(this.usersUrl,  user).subscribe(
      (res) => user.id = res.id,
      (err) => console.log(err)
    );
  }
}
