import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StartScreenModule } from './start-screen/start-screen.module';
import { NewGameScreenModule } from './new-game-screen/new-game-screen.module';
import { LoadGameScreenModule } from './load-game-screen/load-game-screen.module';
import { TeamsScreenModule } from './teams-screen/teams-screen.module';
import { RoundScreenModule } from './round-screen/round-screen.module';
import { VictoryScreenModule } from './victory-screen/victory-screen.module';
import { GameService } from './services/game.service';
import { RoundService } from './services/round.service';
import { QuestionService } from './services/question.service';
import { AnswerService } from './services/answer.service';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StartScreenModule,
    NewGameScreenModule,
    LoadGameScreenModule,
    TeamsScreenModule,
    RoundScreenModule,
    VictoryScreenModule
  ],
  providers: [
    RoundService,
    QuestionService,
    AnswerService,
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
