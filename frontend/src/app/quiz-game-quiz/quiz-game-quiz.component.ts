import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Quiz} from '../../models/quiz.model';
import {Answer} from '../../models/answer.model';
import {Question} from '../../models/question.model';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizGameService} from '../../services/quiz-game.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogEndQuizComponent} from "../dialog-end-quiz/dialog-end-quiz.component";
import {DialogEndQuestionComponent} from "../dialog-end-question/dialog-end-question.component";

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

  constructor(private route: ActivatedRoute, private quizGameService: QuizGameService, public dialog: MatDialog,
              private router: Router) {
    this.quizGameId = +this.route.snapshot.paramMap.get('id');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.quizPlayed.currentValue) {
      this.currentQuestion = this.quizPlayed.questions[this.indiceCurrentQuestion];
    }
  }

  openDialogEndQuiz(): void {
    const dialogRef = this.dialog.open(DialogEndQuizComponent, {
      width: '700px',
      height: '200px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate([' ']);
    });
  }

  private openDialogEndQuestion(a: Answer) {
    const dialogRef = this.dialog.open(DialogEndQuestionComponent, {
      width: '700px',
      height: '200px',
      data: {answer: a}
    });

    dialogRef.afterClosed().subscribe(result => {
      ++this.indiceCurrentQuestion;
      if ( this.indiceCurrentQuestion < this.quizPlayed.questions.length) {
        this.currentQuestion = this.quizPlayed.questions[this.indiceCurrentQuestion];
      } else {
        this.openDialogEndQuiz();
        // Ajouter le quizgame dans la liste des quizgames du player
      }
    });

  }

  isCorrect(answer: Answer) {
    if (answer.isCorrect) {
      this.openDialogEndQuestion(answer);
    } else {
      // mettre à jour quizgame sur nbWrongAnswer et questionFailed
      // Faire disparaitre la question
    }

  }
}
