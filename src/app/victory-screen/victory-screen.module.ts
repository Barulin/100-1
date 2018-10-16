import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VictoryScreenComponent } from './victory-screen.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [VictoryScreenComponent],
  exports: [VictoryScreenComponent]
})
export class VictoryScreenModule { }
