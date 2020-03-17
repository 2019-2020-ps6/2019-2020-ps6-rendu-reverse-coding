import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QuizListComponent} from './quizzes/quiz-list/quiz-list.component';
import {EditQuizComponent} from './quizzes/edit-quiz-component/edit-quiz.component';
import {HomeComponent} from './home/home.component';
import {SignupComponent} from './signup/signup.component';
import {RegisterComponent} from './register/register.component';

const routes: Routes = [
  {path: '', redirectTo: 'signup', pathMatch: 'full' },
  {path: 'signup', component: SignupComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'home', component: HomeComponent },
  {path: 'quiz-list', component: QuizListComponent },
  {path: 'edit-quiz/:id', component: EditQuizComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
