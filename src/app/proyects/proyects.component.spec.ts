import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectsComponent } from './proyects.component';

describe('ProyectsComponent', () => {
  let component: ProyectsComponent;
  let fixture: ComponentFixture<ProyectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProyectsComponent]
    });
    fixture = TestBed.createComponent(ProyectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
