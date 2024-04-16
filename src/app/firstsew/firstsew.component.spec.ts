import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstsewComponent } from './firstsew.component';

describe('FirstsewComponent', () => {
  let component: FirstsewComponent;
  let fixture: ComponentFixture<FirstsewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstsewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstsewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
