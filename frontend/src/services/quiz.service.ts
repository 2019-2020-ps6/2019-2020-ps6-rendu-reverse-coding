import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { Quiz } from '../models/quiz.model';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';
import {User} from '../models/user.model';
import {QuestionService} from './question.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private quizzes: Quiz[];
  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);
  constructor(private http: HttpClient, private userService: UserService, private questionService: QuestionService) {
    this.setQuizzesFromUrl();
  }

  addQuiz(quiz: Quiz) {
    quiz.userId = this.userService.curentUser.id;
    this.quizzes.push(quiz);
    this.quizzes$.next(this.quizzes);

    this.http.post<Quiz>(this.userService.usersUrl + this.userService.curentUser.id + '/quizzes',  quiz).subscribe(
      (res) => quiz.id = res.id,
      (err) => console.log(err)
    );
  }

  deleteQuiz(quiz: Quiz) {
    this.quizzes.splice(this.quizzes.indexOf(quiz), 1);
    this.quizzes$.next(this.quizzes);

    this.deleteQuestionsAssociateToQuiz(quiz);
    this.http.delete<Quiz>(this.userService.usersUrl + this.userService.curentUser.id + '/quizzes/' + quiz.id).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  deleteQuestionsAssociateToQuiz(quiz: Quiz) {
    quiz.questions.forEach((question) => {
      this.questionService.deleteQuestionInBack(question, quiz);
    });
  }

  setQuizzesFromUrl() {
    this.userService.setCurrentUser();
    this.http.get<User>(this.userService.usersUrl + this.userService.curentUser.id).subscribe((object) => {
      this.quizzes = object.quizzes;
      this.quizzes$.next(this.quizzes);
    });
  }
}
