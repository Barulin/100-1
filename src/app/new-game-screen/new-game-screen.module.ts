import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewGameScreenComponent } from './new-game-screen.component';
import { RoundDescriptionComponent } from './round-description/round-description.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [NewGameScreenComponent, RoundDescriptionComponent],
  exports: [NewGameScreenComponent]
})
export class NewGameScreenModule { }
