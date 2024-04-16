import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackbComponent } from './packb.component';

describe('PackbComponent', () => {
  let component: PackbComponent;
  let fixture: ComponentFixture<PackbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
