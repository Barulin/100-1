import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsScreenComponent } from './teams-screen.component';

describe('TeamsScreenComponent', () => {
  let component: TeamsScreenComponent;
  let fixture: ComponentFixture<TeamsScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamsScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
