import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutAffectationEquipementComponent } from './ajout-affectation-equipement.component';

describe('AjoutAffectationEquipementComponent', () => {
  let component: AjoutAffectationEquipementComponent;
  let fixture: ComponentFixture<AjoutAffectationEquipementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutAffectationEquipementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutAffectationEquipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
