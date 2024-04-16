import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnylonComponent } from './addnylon.component';

describe('AddnylonComponent', () => {
  let component: AddnylonComponent;
  let fixture: ComponentFixture<AddnylonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnylonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddnylonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
