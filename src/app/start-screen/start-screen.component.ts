import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.css']
})
export class StartScreenComponent implements OnInit {

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
  }

  initNew() {
    this.gameService.setGameState('new');
  }

  initLoad() {
    this.gameService.loadRoundsHttp()
      .subscribe((rounds) => {
        console.log('--- rounds', rounds);
        this.gameService.setRoundsAsync(rounds);
        this.gameService.setGameState('teams');
      });
  }

}
