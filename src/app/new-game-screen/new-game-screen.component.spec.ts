import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGameScreenComponent } from './new-game-screen.component';

describe('NewGameScreenComponent', () => {
  let component: NewGameScreenComponent;
  let fixture: ComponentFixture<NewGameScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewGameScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGameScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
