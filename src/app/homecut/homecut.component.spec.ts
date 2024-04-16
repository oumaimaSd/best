import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomecutComponent } from './homecut.component';

describe('HomecutComponent', () => {
  let component: HomecutComponent;
  let fixture: ComponentFixture<HomecutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomecutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomecutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
