import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../../services/game.service';
import { ITeam } from '../../model/i-team';

@Component({
  selector: 'app-team-bar',
  templateUrl: './team-bar.component.html',
  styleUrls: ['./team-bar.component.css']
})
export class TeamBarComponent implements OnInit {
  @Input() team: ITeam;
  misses: number[] = [];

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    for (let i = this.team.missLimit; i >= 1; i--) {
      this.misses.push(i);
    }
  }

  missClick(event) {
    const missButton = event.currentTarget;

    if (!this.gameService.curTeam) {
      event.currentTarget.classList.add('grid_item_miss__true');
      setTimeout(() => {
        missButton.classList.remove('grid_item_miss__true');
      }, 1000)
      return;
    }

    this.gameService.processMiss(this.team);
  }

}
