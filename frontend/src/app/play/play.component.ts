import { Component, OnInit } from '@angular/core';
import {Quiz} from '../../models/quiz.model';
import {QuizService} from '../../services/quiz.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  public quizList: Quiz[];
  public quizPlayed: Quiz;
  public quizIdSelected = 0;
  constructor(public quizService: QuizService) {
    this.quizService.quizzes$.subscribe((quiz) => this.quizList = quiz);
  }

  ngOnInit() {
  }

  rowSelected(quiz: Quiz) {
    this.quizPlayed = quiz;
    this.quizIdSelected = quiz.id;
    console.log(quiz);
  }
}
