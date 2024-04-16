import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovertComponent } from './covert.component';

describe('CovertComponent', () => {
  let component: CovertComponent;
  let fixture: ComponentFixture<CovertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CovertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
