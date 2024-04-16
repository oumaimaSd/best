import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtestingComponent } from './addtesting.component';

describe('AddtestingComponent', () => {
  let component: AddtestingComponent;
  let fixture: ComponentFixture<AddtestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddtestingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddtestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
