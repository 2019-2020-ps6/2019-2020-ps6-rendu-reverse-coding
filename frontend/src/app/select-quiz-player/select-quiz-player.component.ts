import { Component, OnInit } from '@angular/core';
import {Quiz} from '../../models/quiz.model';
import {QuizService} from '../../services/quiz.service';
import {Player} from '../../models/player.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PlayerService} from '../../services/player.service';
import {QuizGame} from '../../models/quizgame';
import {QuizGameService} from '../../services/quiz-game.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-select-quiz-player',
  templateUrl: './select-quiz-player.component.html',
  styleUrls: ['./select-quiz-player.component.scss']
})
export class SelectQuizPlayerComponent implements OnInit {
  public quizList: Quiz[];
  public quizSelected: Quiz;
  public quizIdSelected = -1;
  public playerList: Player[];
  public playerForm: FormGroup;
  public quizGame: QuizGame = {};

  constructor(public quizService: QuizService, private playerService: PlayerService,
              private quizGameService: QuizGameService, private router: Router,
              private formBuilder: FormBuilder) {
    this.quizService.quizzes$.subscribe((quiz) => this.quizList = quiz);
    this.playerService.players$.subscribe((player) => this.playerList = player);
  }

  ngOnInit() {
    this.playerForm = this.formBuilder.group({
      playerControl: []
    });
  }

  rowSelected(quiz: Quiz) {
    this.quizSelected = quiz;
    this.quizIdSelected = quiz.id;
    console.log(quiz);
  }

  createQuizGame() {
    this.quizGame.quiz = this.quizSelected;
    const player = this.playerForm.getRawValue();
    this.quizGame.player = player.playerControl as Player;
    this.quizGameService.createQuizGame(this.quizGame);
    this.router.navigate(['select-quiz-player/' + this.quizGame.id]);
  }
}
