import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSize } from './card-size';

describe('CardSize', () => {
  let component: CardSize;
  let fixture: ComponentFixture<CardSize>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardSize],
    }).compileComponents();

    fixture = TestBed.createComponent(CardSize);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
