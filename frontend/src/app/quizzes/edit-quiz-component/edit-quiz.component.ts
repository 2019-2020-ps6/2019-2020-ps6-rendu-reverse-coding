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
export class EditQuizComponent implements OnInit {
  quiz: Quiz;

  constructor(private route: ActivatedRoute,
              private quizService: QuizService,
              private location: Location) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getQuiz(id).then((quiz) => {
      this.quiz = quiz;
    });
  }
  ngOnInit(): void {
  }

  async getQuiz(id: number): Promise<Quiz> {
    return await this.quizService.getQuiz(id).toPromise();
  }

  goBack(): void {
    this.location.back();
  }
}
