import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { IRound } from '../model/i-round';
import { IQuestion } from '../model/i-question';
import { IAnswer } from '../model/i-answer';

@Component({
  selector: 'app-round-screen',
  templateUrl: './round-screen.component.html',
  styleUrls: ['./round-screen.component.css']
})
export class RoundScreenComponent implements OnInit {

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.loadRound(1);
  }

  flip(event, answer) {
    if (event.currentTarget.classList.contains('flipped')) {
      return;
    }

    event.currentTarget.classList.add('flipped');

    this.gameService.processAnswer(answer);
  }

}

