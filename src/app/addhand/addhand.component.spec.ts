import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddhandComponent } from './addhand.component';

describe('AddhandComponent', () => {
  let component: AddhandComponent;
  let fixture: ComponentFixture<AddhandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddhandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddhandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
