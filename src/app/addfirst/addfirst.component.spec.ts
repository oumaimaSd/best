import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfirstComponent } from './addfirst.component';

describe('AddfirstComponent', () => {
  let component: AddfirstComponent;
  let fixture: ComponentFixture<AddfirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddfirstComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddfirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
