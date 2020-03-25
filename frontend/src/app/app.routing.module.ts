import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QuizListComponent} from './quizzes/quiz-list/quiz-list.component';
import {EditQuizComponent} from './quizzes/edit-quiz-component/edit-quiz.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {PlayComponent} from './play/play.component';
import {PlayQuizComponent} from './play-quiz/play-quiz.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'play', component: PlayComponent, canActivate: [AuthGuard] },
  {path: 'quiz-list', component: QuizListComponent , canActivate: [AuthGuard]},
  {path: 'edit-quiz/:id', component: EditQuizComponent , canActivate: [AuthGuard]},
  {path: 'play/:id', component: PlayQuizComponent, canActivate: [AuthGuard]},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
