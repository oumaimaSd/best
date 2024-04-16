import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NylonComponent } from './nylon.component';

describe('NylonComponent', () => {
  let component: NylonComponent;
  let fixture: ComponentFixture<NylonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NylonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NylonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
