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
  private quizGameId: number;
  public indiceCurrentQuestion = 0;
  public nbWrongAnswers = 0;
  public questionsFailed = [];

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
      if ( !result) {
        this.router.navigate([' ']);
      }
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
        this.quizGameService.updateQuizGame(this.quizGameId, this.nbWrongAnswers, this.questionsFailed);
        // Ajouter le quizgame dans la liste des quizgames du player
      }
    });

  }

  isCorrect(answer: Answer) {
    if (answer.isCorrect) {
      this.openDialogEndQuestion(answer);
    } else {
      ++this.nbWrongAnswers;
      if (!this.questionsFailed.find((q) => q.id === this.currentQuestion.id)) {
         this.questionsFailed.push(this.currentQuestion);
      }
      // Faire disparaitre la question
    }

  }
}
