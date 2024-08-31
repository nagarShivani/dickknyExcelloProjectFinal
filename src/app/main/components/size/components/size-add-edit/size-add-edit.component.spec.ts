import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeAddEditComponent } from './size-add-edit.component';

describe('SizeAddEditComponent', () => {
  let component: SizeAddEditComponent;
  let fixture: ComponentFixture<SizeAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SizeAddEditComponent]
    });
    fixture = TestBed.createComponent(SizeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
