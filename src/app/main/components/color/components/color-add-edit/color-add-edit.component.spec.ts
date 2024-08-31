import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorAddEditComponent } from './color-add-edit.component';

describe('ColorAddEditComponent', () => {
  let component: ColorAddEditComponent;
  let fixture: ComponentFixture<ColorAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColorAddEditComponent]
    });
    fixture = TestBed.createComponent(ColorAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
