import {Injectable} from '@angular/core';
import {Question} from '../models/question.model';
import {BehaviorSubject} from 'rxjs';
import {Quiz} from '../models/quiz.model';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  questions: Question[];
  public questions$: BehaviorSubject<Question[]> = new BehaviorSubject(this.questions);
  private questionsUrl =  'http://localhost:9428/api/quizzes/';
  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  init() {
    this.questions$.next(this.questions);
  }

  addQuestion(question: Question, quiz: Quiz) {
    quiz.questions.push(question);
    this.questions = quiz.questions;
    this.questions$.next(this.questions);
    this.http.post<Question>( this.questionsUrl + quiz.id + '/questions',  question).subscribe(
      (res) => {
        question.id = res.id;
      },
      (err) => console.log(err)
    );
  }

  deleteQuestion(question: Question, quiz: Quiz) {
    quiz.questions.splice(this.questions.indexOf(question), 1);
    this.questions = quiz.questions;
    this.questions$.next(this.questions);

    this.http.delete<Question>(this.questionsUrl  + quiz.id + '/questions/' + question.id).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
