import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationEquipementComponent } from './affectation-equipement.component';

describe('AffectationEquipementComponent', () => {
  let component: AffectationEquipementComponent;
  let fixture: ComponentFixture<AffectationEquipementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffectationEquipementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationEquipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
