import { Injectable } from '@angular/core';
import { IRound } from '../model/i-round';
import { ROUNDS } from '../model/i-round';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RoundService {
  private rounds: IRound[] = ROUNDS;
  validate$ = new Subject<void>();
  validateState = new Subject<boolean>();
  validateStates = {};
  invalidRound: IRound;

  constructor() {
  }

  setValidateStates() {
    this.rounds.forEach(i => {
      this.validateStates[i.index] = false;
    });
    this.invalidRound = null;
  }

  checkValidateStates(): boolean {
    if (Object.values(this.validateStates).filter(i => i === false).length === 0) {
      return true;
    }
    return false;
  }

  getRounds(): IRound[] {
    return this.rounds;
  }

  getRoundByIndex(index: number): IRound {
    return this.rounds.find(r => r.index === index);
  }

  validateForm() {
    this.setValidateStates();
    this.validate$.next();
  }


}
