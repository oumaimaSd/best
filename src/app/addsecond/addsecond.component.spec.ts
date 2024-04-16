import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsecondComponent } from './addsecond.component';

describe('AddsecondComponent', () => {
  let component: AddsecondComponent;
  let fixture: ComponentFixture<AddsecondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddsecondComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddsecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
