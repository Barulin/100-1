import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadGameScreenComponent } from './load-game-screen.component';

describe('LoadGameScreenComponent', () => {
  let component: LoadGameScreenComponent;
  let fixture: ComponentFixture<LoadGameScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadGameScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadGameScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
