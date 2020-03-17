import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  users: User[];
  correct = true;

  constructor(public formBuilder: FormBuilder, public userService: UserService, private router: Router) {
    this.initialiazeSignUpForm();
  }

  ngOnInit() {
  }

  private initialiazeSignUpForm() {
    this.signupForm = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  testUserValid() {
    const userToTest: User = this.signupForm.getRawValue() as User;
    console.log(userToTest);
    this.signupForm.reset();
    this.getUsers().then((users: User[]) => {
      this.users = users;
      let valid = false;
      this.users.forEach((user) => {
          if (user.email === userToTest.email && user.password === userToTest.password) {
            this.router.navigate(['home']);
            valid = true;
          }
      });
      this.correct = valid;
    });
  }

  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers().toPromise();
  }
}
