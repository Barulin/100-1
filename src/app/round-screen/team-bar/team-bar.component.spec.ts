import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamBarComponent } from './team-bar.component';

describe('TeamBarComponent', () => {
  let component: TeamBarComponent;
  let fixture: ComponentFixture<TeamBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
