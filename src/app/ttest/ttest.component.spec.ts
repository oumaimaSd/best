import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtestComponent } from './ttest.component';

describe('TtestComponent', () => {
  let component: TtestComponent;
  let fixture: ComponentFixture<TtestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TtestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
