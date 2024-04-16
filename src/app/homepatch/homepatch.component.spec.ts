import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepatchComponent } from './homepatch.component';

describe('HomepatchComponent', () => {
  let component: HomepatchComponent;
  let fixture: ComponentFixture<HomepatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomepatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
