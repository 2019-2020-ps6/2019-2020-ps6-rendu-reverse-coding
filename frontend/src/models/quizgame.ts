import {Player} from './player.model';
import {Quiz} from './quiz.model';
import {Question} from './question.model';
import {Answer} from './answer.model';

export interface QuizGame {
  id?: number;
  quiz?: Quiz;
  player?: Player;
  correctAnswer?: Answer[];
  questionsFailed?: Question[];
}
