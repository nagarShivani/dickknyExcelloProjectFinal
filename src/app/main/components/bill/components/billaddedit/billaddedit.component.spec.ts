import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilladdeditComponent } from './billaddedit.component';

describe('BilladdeditComponent', () => {
  let component: BilladdeditComponent;
  let fixture: ComponentFixture<BilladdeditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BilladdeditComponent]
    });
    fixture = TestBed.createComponent(BilladdeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
