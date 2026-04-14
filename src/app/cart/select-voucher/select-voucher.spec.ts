import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectVoucher } from './select-voucher';

describe('SelectVoucher', () => {
  let component: SelectVoucher;
  let fixture: ComponentFixture<SelectVoucher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectVoucher],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectVoucher);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
