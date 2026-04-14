import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingStatus } from './shipping-status';

describe('ShippingStatus', () => {
  let component: ShippingStatus;
  let fixture: ComponentFixture<ShippingStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShippingStatus],
    }).compileComponents();

    fixture = TestBed.createComponent(ShippingStatus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
