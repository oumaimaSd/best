import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpatchComponent } from './addpatch.component';

describe('AddpatchComponent', () => {
  let component: AddpatchComponent;
  let fixture: ComponentFixture<AddpatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddpatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddpatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
