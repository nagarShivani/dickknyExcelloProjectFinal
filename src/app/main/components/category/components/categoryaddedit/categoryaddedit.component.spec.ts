import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryaddeditComponent } from './categoryaddedit.component';

describe('CategoryaddeditComponent', () => {
  let component: CategoryaddeditComponent;
  let fixture: ComponentFixture<CategoryaddeditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryaddeditComponent]
    });
    fixture = TestBed.createComponent(CategoryaddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
