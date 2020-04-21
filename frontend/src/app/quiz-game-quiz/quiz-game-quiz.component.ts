import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Quiz} from '../../models/quiz.model';
import {Answer} from "../../models/answer.model";
import {Question} from "../../models/question.model";
import {ActivatedRoute, Router} from "@angular/router";
import {QuizGameService} from "../../services/quiz-game.service";

@Component({
  selector: 'app-quiz-game-quiz',
  templateUrl: './quiz-game-quiz.component.html',
  styleUrls: ['./quiz-game-quiz.component.scss']
})
export class QuizGameQuizComponent implements OnChanges {
  @Input()
  public quizPlayed: Quiz;
  public currentQuestion: Question;
  public indiceCurrentQuestion = 0;
  private quizGameId: number;

  constructor(private route: ActivatedRoute, private quizGameService: QuizGameService) {
    this.quizGameId = +this.route.snapshot.paramMap.get('id');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['quizPlayed'].currentValue) {
      this.currentQuestion = this.quizPlayed.questions[this.indiceCurrentQuestion];
    }
  }

  isCorrect(answer: Answer) {
    if (answer.isCorrect) {
      console.log("BRAVOOO")
      ++this.indiceCurrentQuestion;
      if ( this.indiceCurrentQuestion < this.quizPlayed.questions.length) {

        this.currentQuestion = this.quizPlayed.questions[this.indiceCurrentQuestion];
      }else{
        console.log("Vous avez terminé le Quiz !");
        // Pop up de fin de quiz
        // Ajouter le quizgame dans la liste des quizgames du player
      }
    }else{
      // mettre à jour quizgame sur nbWrongAnswer et questionFailed
      // Faire disparaitre la question
    }

  }


}
