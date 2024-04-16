import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnkertComponent } from './spinnkert.component';

describe('SpinnkertComponent', () => {
  let component: SpinnkertComponent;
  let fixture: ComponentFixture<SpinnkertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnkertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinnkertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
