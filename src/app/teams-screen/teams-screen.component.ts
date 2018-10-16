import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { GameService } from '../services/game.service';

const ERROR_TEXTS = {
  NAMES_EMPTY: 'С названиями играть будет интересней. Пожалуйста, заполните их.'
}

@Component({
  selector: 'app-teams-screen',
  templateUrl: './teams-screen.component.html',
  styleUrls: ['./teams-screen.component.css']
})
export class TeamsScreenComponent implements OnInit {
  form: FormGroup;
  hasError = false;
  errorText = '';

  constructor(private gameService: GameService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      team1: ['Команда 1', [Validators.required, Validators.maxLength(30)]],
      team2: ['Команда 2', [Validators.required, Validators.maxLength(30)]]
    });
  }

  continue() {
    if (this.form.invalid) {
      this.hasError = true;
      this.errorText = ERROR_TEXTS.NAMES_EMPTY;
      setTimeout(() => {
        this.hasError = false;
        this.errorText = '';
      }, 3000);
      return;
    }

    this.gameService.initTeams(this.form.value);
    this.gameService.setGameState('round');
  }

  back() {
    this.gameService.setGameState('new');
  }

}
