import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundDescriptionComponent } from './round-description.component';

describe('RoundDescriptionComponent', () => {
  let component: RoundDescriptionComponent;
  let fixture: ComponentFixture<RoundDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
