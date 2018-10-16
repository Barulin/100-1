import { Component, OnInit } from '@angular/core';
import { IRound } from '../model/i-round';
import { IQuestion } from '../model/i-question';
import { IAnswer } from '../model/i-answer';
import { GameService } from '../services/game.service';
import { RoundService } from '../services/round.service';
import { QuestionService } from '../services/question.service';
import { AnswerService } from '../services/answer.service';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-new-game-screen',
  templateUrl: './new-game-screen.component.html',
  styleUrls: ['./new-game-screen.component.css']
})
export class NewGameScreenComponent implements OnInit {
  selectedRound: IRound;
  rounds: IRound[];
  questions: IQuestion[];
  answers: IAnswer[];
  private subscription: ISubscription;

  constructor(private gameService: GameService,
              private roundService: RoundService,
              private questionService: QuestionService,
              private answerService: AnswerService) {
  }

  ngOnInit() {
    this.rounds = this.roundService.getRounds();
    this.selectedRound = this.roundService.getRoundByIndex(1);

    this.questions = this.questionService.allQuestions;
    if (this.questions.length === 0) {
      this.questions = this.questionService.initNewQuestions(this.rounds);
    }
    this.answers = this.answerService.allAnswers;
    if (this.answers.length === 0) {
      this.answers = this.answerService.initNewAnswers(this.questions);
    }

    this.subscription = this.roundService.validateState.subscribe(res => {
      if (!res && this.roundService.invalidRound) {
        this.selectedRound = this.roundService.invalidRound;
        return;
      }
      if (this.roundService.checkValidateStates()) {
        this.gameService.setGameState('teams');
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private selectRound(event) {
    this.selectedRound = this.roundService.getRoundByIndex(parseInt(event.target.dataset.index));
  }

  continue() {
    this.roundService.validateForm();
  }

  back() {
    this.gameService.setGameState('start');
  }
}
