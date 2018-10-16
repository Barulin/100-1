import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { RoundService} from './round.service'
import { QuestionService} from './question.service'
import { AnswerService} from './answer.service'
import { IRound } from '../model/i-round';
import { IQuestion } from '../model/i-question';
import { IAnswer } from '../model/i-answer';
import { ITeam } from '../model/i-team';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

const BASE_URL = 'https://course-ac632.firebaseio.com/';

@Injectable()
export class GameService {
  gameState$ = new Subject<string>();
  team1: ITeam;
  team2: ITeam;
  curTeam: ITeam;
  curRoundWinner: ITeam;
  
  curRoundIndex: number;
  curRound: IRound;
  curQuestion: IQuestion;
  curAnswers: IAnswer[];
  curScore: number;
  
  isStarted: boolean;
  isBlitz: boolean;
  scoreStop: boolean;


  constructor(private roundService: RoundService,
              private questionService: QuestionService,
              private answerService: AnswerService,
              private http: HttpClient) {
  }

  setGameState(state: string) {
    this.gameState$.next(state);
  }

  loadRoundsHttp(): Observable<any> {
    return this.http.get(`${BASE_URL}/rounds.json`)
      .map(result => {
        return Object.entries(result).map(
          ([key, value]) => Object.assign({}, value, {key})
        );
      });
  }

  setRoundsAsync(rounds) {
    const questions = this.questionService.initNewQuestions(rounds);
    const answers = this.answerService.initNewAnswers(questions);

    questions.forEach(q => {
      q.content = rounds.find(r => r.index === q.roundIndex).question;
    })
    answers.forEach(a => {
      a.content = rounds.find(r => r.index === a.roundIndex)['content' + a.index];
      a.points = rounds.find(r => r.index === a.roundIndex)['points' + a.index];
    })
  }


  initTeams({team1, team2}) {
    this.team1 = {
      name: team1,
      score: 0,
      missCount: 0,
      missLimit: 3,
    };
    this.team2 = {
      name: team2,
      score: 0,
      missCount: 0,
      missLimit: 3,
    };
  }

  activateTeam(team: ITeam) {
    this.curRoundWinner = team;
    this.curTeam = team;
  }

  changeTeam() {
    if (this.curTeam === this.team1) {
      this.curTeam = this.team2;
      return;
    }

    this.curTeam = this.team1;
  }

  loadRound(roundIndex: number) {
    this.curRoundIndex = roundIndex;
    this.curRound = this.roundService.getRoundByIndex(roundIndex);
    if (!this.curRound) {
      this.setGameState('victory');
      return;
    }
    this.curQuestion = this.questionService.getQuestionForRound(this.curRound);
    this.curAnswers = this.answerService.getAnswersForRound(this.curRound);
    this.curScore = 0;
    this.scoreStop = this.curRound.pointsStrict ? true : false;
    this.curTeam = null;
    this.curRoundWinner = null;
    this.isBlitz = false;
    this.isStarted = false;
    this.team1.missCount = 0;
    this.team2.missCount = 0;
  }

  nextRound() {
    if (this.curRoundWinner) {
      this.curRoundWinner.score += this.curScore;
    }
    this.loadRound(this.curRoundIndex + 1)
  }

  startRound() {
    this.isStarted = true;
  }

  processAnswer(answer: IAnswer) {
    if (this.isBlitz) {
      this.curRoundWinner = this.curTeam;
      this.curScore += answer.points * this.curRound.pointsCoef;
      this.isBlitz = false;
      this.scoreStop = true;
    }

    if (!this.scoreStop && !this.curRound.pointsStrict) {
      this.curScore += answer.points * this.curRound.pointsCoef;
    }

    if (this.curRound.pointsStrict && this.curTeam) {
      this.curTeam.score += answer.points * this.curRound.pointsCoef;
      this.curTeam = null;
    }
  }

  processMiss(team: ITeam) {
    if (this.curTeam !== team) {
      return;
    }

    if (this.isBlitz) {
      this.isBlitz = false;
      this.curTeam.missCount += 1;
      this.scoreStop = true;
    }

    if (this.scoreStop) {
      return;
    }
  
    this.curTeam.missCount += 1;
    if (this.curTeam.missCount === team.missLimit) {
      this.isBlitz = true;
      this.changeTeam();
    }
  }

}
