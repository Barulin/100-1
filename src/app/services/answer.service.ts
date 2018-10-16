import { Injectable } from '@angular/core';
import { IAnswer } from '../model/i-answer';
import { IQuestion } from '../model/i-question';
import { IRound } from '../model/i-round';

@Injectable()
export class AnswerService {
  private answers: IAnswer[] = [];

  constructor() {
  }

  private clearAnswers() {
    this.answers.length = 0;
  }

  initNewAnswers(questions: IQuestion[]): IAnswer[] {
    this.clearAnswers();

    questions.forEach(q => {
      for (let i = 1; i <= q.answersCount; i++) {
        this.answers.push({
          roundIndex: q.roundIndex,
          questionIndex: q.index,
          index: i,
          content: '',
          points: null
        });
      };
    });

    return this.answers;
  }

  get allAnswers(): IAnswer[] {
    return this.answers;
  }

  getAnswersForRound(round: IRound): IAnswer[] {
    return this.answers
      .filter(a => a.roundIndex === round.index)
      .sort((x, y) => {
        return x.index - y.index;
      });
  }

  setAnswersForRound(answers: IAnswer[], round: IRound) {
    this.answers = this.answers
      .filter(a => a.roundIndex !== round.index)
      .concat(answers);
  }
}
