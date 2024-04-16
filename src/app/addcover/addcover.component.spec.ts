import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcoverComponent } from './addcover.component';

describe('AddcoverComponent', () => {
  let component: AddcoverComponent;
  let fixture: ComponentFixture<AddcoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcoverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
