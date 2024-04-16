import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpackbComponent } from './addpackb.component';

describe('AddpackbComponent', () => {
  let component: AddpackbComponent;
  let fixture: ComponentFixture<AddpackbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddpackbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddpackbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
