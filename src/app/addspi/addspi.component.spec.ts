import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddspiComponent } from './addspi.component';

describe('AddspiComponent', () => {
  let component: AddspiComponent;
  let fixture: ComponentFixture<AddspiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddspiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddspiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
