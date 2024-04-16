import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinitionComponent } from './finition.component';

describe('FinitionComponent', () => {
  let component: FinitionComponent;
  let fixture: ComponentFixture<FinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
