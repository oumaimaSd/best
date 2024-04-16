import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcutComponent } from './addcut.component';

describe('AddcutComponent', () => {
  let component: AddcutComponent;
  let fixture: ComponentFixture<AddcutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
