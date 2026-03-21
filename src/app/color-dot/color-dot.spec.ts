import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorDot } from './color-dot';

describe('ColorDot', () => {
  let component: ColorDot;
  let fixture: ComponentFixture<ColorDot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColorDot],
    }).compileComponents();

    fixture = TestBed.createComponent(ColorDot);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
