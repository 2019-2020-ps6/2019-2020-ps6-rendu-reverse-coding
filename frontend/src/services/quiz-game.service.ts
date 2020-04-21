import { Injectable } from '@angular/core';
import {QuizGame} from '../models/quizgame';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizGameService {
  private quizGames: QuizGame[];
  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizGames$: BehaviorSubject<QuizGame[]> = new BehaviorSubject(this.quizGames);
  constructor(private http: HttpClient) {
    this.setQuizGamesFromUrl();
  }

  createQuizGame(quizGame: QuizGame) {
    this.quizGames.push(quizGame);
    this.quizGames$.next(this.quizGames);
    this.http.post<QuizGame>('http://localhost:9428/api/quizgames' , quizGame).subscribe(
      (res) => quizGame.id = res.id,
      (err) => console.log(err)
    );
  }

  private setQuizGamesFromUrl() {
    this.http.get<QuizGame[]>('http://localhost:9428/api/quizgames').subscribe((object) => {
      this.quizGames = object;
      this.quizGames$.next(this.quizGames);
    });
  }
}
