import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../../../models/question.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input()
  question: Question;

  @Output()
  questionDeleted: EventEmitter<Question> = new EventEmitter<Question>();

  constructor() { }

  ngOnInit() {
  }

  deleteQuestion() {
    this.questionDeleted.emit(this.question);
  }

  // get answers() {
  //   return this.questionForm.get('answers') as FormArray;
  // }
  //
  // addAnswer() {
  //   this.answers.push(this.createAnswer());
  // }
  //
  // private createAnswer() {
  //   return this.formBuilder.group({
  //     value: '',
  //     isCorrect: false,
  //   });
  // }

}
