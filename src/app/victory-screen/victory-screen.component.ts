import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { ITeam } from '../model/i-team';

@Component({
  selector: 'app-victory-screen',
  templateUrl: './victory-screen.component.html',
  styleUrls: ['./victory-screen.component.css']
})
export class VictoryScreenComponent implements OnInit {
  winnerTeam: ITeam;
  isDue: boolean;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    if (this.gameService.team1.score === this.gameService.team2.score) {
      this.isDue = true;
      return;
    }

    this.isDue = false;
    this.winnerTeam = (this.gameService.team1.score > this.gameService.team2.score) ? 
                        this.gameService.team1 : 
                        this.gameService.team2;
  }

  initStart() {
    this.gameService.setGameState('start');
  }

}
