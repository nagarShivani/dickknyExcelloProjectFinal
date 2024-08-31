import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsAddEditComponent } from './blogs-add-edit.component';

describe('BlogsAddEditComponent', () => {
  let component: BlogsAddEditComponent;
  let fixture: ComponentFixture<BlogsAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogsAddEditComponent]
    });
    fixture = TestBed.createComponent(BlogsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
