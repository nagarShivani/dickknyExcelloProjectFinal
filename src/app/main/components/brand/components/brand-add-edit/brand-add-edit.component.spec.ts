import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandAddEditComponent } from './brand-add-edit.component';

describe('BrandAddEditComponent', () => {
  let component: BrandAddEditComponent;
  let fixture: ComponentFixture<BrandAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrandAddEditComponent]
    });
    fixture = TestBed.createComponent(BrandAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
