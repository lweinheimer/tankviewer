import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tank3dComponent } from './tank3d.component';

describe('Tank3dComponent', () => {
  let component: Tank3dComponent;
  let fixture: ComponentFixture<Tank3dComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Tank3dComponent]
    });
    fixture = TestBed.createComponent(Tank3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
