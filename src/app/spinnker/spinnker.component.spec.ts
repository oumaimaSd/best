import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnkerComponent } from './spinnker.component';

describe('SpinnkerComponent', () => {
  let component: SpinnkerComponent;
  let fixture: ComponentFixture<SpinnkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnkerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinnkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
