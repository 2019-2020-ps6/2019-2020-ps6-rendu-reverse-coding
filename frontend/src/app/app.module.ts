import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { QuizComponent } from './quizzes/quiz/quiz.component';
import { HeaderComponent } from './header/header.component';
import { QuizFormComponent } from './quizzes/quiz-form/quiz-form.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { EditQuizComponent } from './quizzes/edit-quiz-component/edit-quiz.component';
import { AppRoutingModule} from './app.routing.module';
import { QuestionComponent } from './quizzes/question/question.component';
import { QuestionFormComponent } from './quizzes/question-form/question-form.component';
import { QuestionListComponent } from './quizzes/question-list/question-list.component';
import { AnswerComponent } from './quizzes/answer/answer.component';
import { HomeComponent } from './home/home.component';
import { AnswerListComponent } from './quizzes/answer-list/answer-list.component';
import { AnswerFormComponent } from './quizzes/answer-form/answer-form.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SelectQuizPlayerComponent } from './select-quiz-player/select-quiz-player.component';
import { CreatePlayerComponent } from './create-player/create-player.component';
import { QuizGameComponent } from './quiz-game/quiz-game.component';
import { QuizGameQuizComponent } from './quiz-game-quiz/quiz-game-quiz.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogEndQuizComponent } from './dialog-end-quiz/dialog-end-quiz.component';
import { DialogEndQuestionComponent } from './dialog-end-question/dialog-end-question.component';
import {MatButtonModule} from "@angular/material/button";
import { DialogEndTimerComponent } from './dialog-end-timer/dialog-end-timer.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizListComponent,
    QuizComponent,
    HeaderComponent,
    QuizFormComponent,
    EditQuizComponent,
    QuestionComponent,
    QuestionFormComponent,
    QuestionListComponent,
    AnswerComponent,
    HomeComponent,
    AnswerListComponent,
    AnswerFormComponent,
    LoginComponent,
    RegisterComponent,
    SelectQuizPlayerComponent,
    CreatePlayerComponent,
    QuizGameComponent,
    QuizGameQuizComponent,
    DialogEndQuizComponent,
    DialogEndQuestionComponent,
    DialogEndTimerComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
  ],
  entryComponents: [
    DialogEndQuizComponent,
    DialogEndQuestionComponent,
    DialogEndTimerComponent
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
