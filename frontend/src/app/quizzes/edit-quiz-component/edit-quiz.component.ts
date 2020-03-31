import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import { Location } from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent {
  quiz: Quiz;
  quizzes: Quiz[];
  constructor(private route: ActivatedRoute,
              private quizService: QuizService,
              private location: Location) {
    const id = +this.route.snapshot.paramMap.get('id');
    setTimeout(() => {
      this.quizService.quizzes$.subscribe((quiz) => {
        this.quizzes = quiz;
        this.quiz = this.quizzes.find((q) => q.id === id);
      });
    }, 300);
  }

  goBack(): void {
    this.location.back();
  }
}
