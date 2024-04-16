import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfComponent } from './addf.component';

describe('AddfComponent', () => {
  let component: AddfComponent;
  let fixture: ComponentFixture<AddfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
