import {Question} from './question.model';

export interface QuizGame {
  id?: number;
  quizId?: number;
  playerId?: number;
  nbWrongAnswer?: number;
  questionsFailed?: Question[];
  date?: Date;
}
