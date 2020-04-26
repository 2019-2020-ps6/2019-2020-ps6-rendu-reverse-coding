import {Component} from '@angular/core';
import {PlayerService} from '../../services/player.service';
import {Player} from '../../models/player.model';
import {Quiz} from '../../models/quiz.model';
import {QuizService} from '../../services/quiz.service';
import {QuizGame} from '../../models/quizgame';

@Component({
  selector: 'app-resultats',
  templateUrl: './resultats.component.html',
  styleUrls: ['./resultats.component.scss']
})
export class ResultatsComponent {

  playerList: Player[] = [];
  quizzesPlayed: Quiz[];
  quizGamesPlayer: QuizGame[];
  dataQuizSelected: QuizGame[];
  constructor(private playerService: PlayerService, private quizService: QuizService) {
      this.playerService.setPlayersFromUrl();
      this.playerService.players$.subscribe((player) => this.playerList = player);
  }

  changePlayer(player: Player) {
    this.quizGamesPlayer = player.quizGames;
    const arrayQuizzes = [];
    this.quizGamesPlayer.forEach((quizGame) => {
        this.quizService.quizzes$.subscribe((quizzes) => {
          const quiz = quizzes.find((q) => q.id === quizGame.quizId);
          if (!arrayQuizzes.includes(quiz)) {
            arrayQuizzes.push(quiz);
          }
        });
    });
    this.quizzesPlayed = arrayQuizzes;
  }

  changeQuiz(quizSelected: Quiz) {
    this.dataQuizSelected = this.quizGamesPlayer.filter((quizGame) => quizGame.quizId === quizSelected.id);
  }
}
