import { Injectable } from '@angular/core';
import { IQuestion } from '../model/i-question';
import { IRound } from '../model/i-round';

@Injectable()
export class QuestionService {
  private questions: IQuestion[] = [];

  constructor() {
  }

  private clearQuestions() {
    this.questions.length = 0;
  }

  initNewQuestions(rounds: IRound[]): IQuestion[] {
    this.clearQuestions();

    rounds.forEach(r => {
      this.questions.push({
        roundIndex: r.index,
        index: 1,
        content: '',
        answersCount: 6
      });
    });

    return this.questions;
  }

  get allQuestions(): IQuestion[] {
    return this.questions;
  }

  getQuestionForRound(round: IRound): IQuestion {
    return this.questions.find(q => q.roundIndex === round.index);
  }

  setQuestionForRound(question: IQuestion, round: IRound) {
    this.questions = this.questions
      .filter(q => q.roundIndex !== round.index)
      .concat(question);
  }
}
