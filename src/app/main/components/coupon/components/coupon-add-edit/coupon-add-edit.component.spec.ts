import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponAddEditComponent } from './coupon-add-edit.component';

describe('CouponAddEditComponent', () => {
  let component: CouponAddEditComponent;
  let fixture: ComponentFixture<CouponAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CouponAddEditComponent]
    });
    fixture = TestBed.createComponent(CouponAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
