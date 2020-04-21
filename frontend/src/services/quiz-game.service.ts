import { Injectable } from '@angular/core';
import {QuizGame} from '../models/quizgame';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizGameService {

  constructor(private http: HttpClient) { }

  createQuizGame(quizGame: QuizGame) {
    this.http.post<QuizGame>('http://localhost:9428/api/quizgames' , quizGame).subscribe(
      (res) => quizGame.id = res.id,
      (err) => console.log(err)
    );
  }
}
