import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsScreenComponent } from './teams-screen.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [TeamsScreenComponent],
  exports: [TeamsScreenComponent]
})
export class TeamsScreenModule { }
