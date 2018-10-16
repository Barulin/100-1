import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundScreenComponent } from './round-screen.component';
import { TeamBarComponent } from './team-bar/team-bar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RoundScreenComponent, TeamBarComponent],
  exports: [RoundScreenComponent]
})
export class RoundScreenModule { }
