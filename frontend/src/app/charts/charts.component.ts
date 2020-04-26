import {Component, Input, OnInit} from '@angular/core';
import {QuizGame} from '../../models/quizgame';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  @Input()
  private quizGames: QuizGame[];
  constructor() { }

  ngOnInit() {
  }

}
