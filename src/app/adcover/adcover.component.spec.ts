import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdcoverComponent } from './adcover.component';

describe('AdcoverComponent', () => {
  let component: AdcoverComponent;
  let fixture: ComponentFixture<AdcoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdcoverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdcoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
