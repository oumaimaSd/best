import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsailsComponent } from './addsails.component';

describe('AddsailsComponent', () => {
  let component: AddsailsComponent;
  let fixture: ComponentFixture<AddsailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddsailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddsailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
