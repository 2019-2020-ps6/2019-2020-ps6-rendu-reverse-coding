import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { Quiz } from '../models/quiz.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

   /**
    * The list of quiz.
    * The list is retrieved from the mock.
    */
  private quizzes: Quiz[];
  private quizzesUrl =  'http://localhost:9428/api/quizzes';
  // http://localhost:9428/api/quizzes
  // https://api.myjson.com/bins/13ajhy
  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);
  constructor(private http: HttpClient) {
    this.setQuizzesFromUrl();
  }

  addQuiz(quiz: Quiz) {
    // You need here to update the list of quiz and then update our observable (Subject) with the new list
    // More info: https://angular.io/tutorial/toh-pt6#the-searchterms-rxjs-subject
    this.quizzes.push(quiz);
    this.quizzes$.next(this.quizzes);

    this.http.post<Quiz>(this.quizzesUrl,  quiz).subscribe(
      (res) => quiz.id = res.id,
      (err) => console.log(err)
    );
  }

  deleteQuiz(quiz: Quiz) {
    this.quizzes.splice(this.quizzes.indexOf(quiz), 1);
    this.quizzes$.next(this.quizzes);

    this.http.delete<Quiz>(this.quizzesUrl + '/' + quiz.id).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  setQuizzesFromUrl() {
    this.http.get<{quizzes: Quiz[]}>(this.quizzesUrl).subscribe((object) => {
      this.quizzes = object.quizzes;
      this.quizzes$.next(this.quizzes);
    });
  }

  getQuiz(id: number) {
    return this.http.get<Quiz>(this.quizzesUrl + '/' + id);
  }
}
