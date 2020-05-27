import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Answer} from '../../models/answer.model';
import {Question} from '../../models/question.model';
import {DialogResultsComponent} from '../dialog-results/dialog-results.component';
import {DialogData} from '../../models/dialogData';

@Component({
  selector: 'app-dialog-end-quiz',
  templateUrl: './dialog-end-quiz.component.html',
  styleUrls: ['./dialog-end-quiz.component.scss']
})
export class DialogEndQuizComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogEndQuizComponent>, public dialog: MatDialog,
              private router: Router, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }
  // A ajouter si bien avancé
  // replayQuiz() {
  //   this.dialogRef.close();
  //   this.router.navigate([' ']);
  // }

  playAnotherQuiz() {
    this.router.navigate(['select-quiz-player']);
    this.dialogRef.close(true);
  }

  backHome() {
    this.dialogRef.close();
  }

  seeResults() {
   // this.router.navigate(['resultats']);
   /* this.dialog.open(DialogResultsComponent, {
      width: 'auto',
      height: 'auto',
      data: { selectedAnswers: this.data.quizGame.selectedAnswers , questionsFailed: this.data.quizGame.questionsFailed, questions: this.data.quizGame.quiz.questions }});
    this.dialogRef.close(true);
    
    */
    console.log(this.data.quizGame.selectedAnswers);
  }

}
