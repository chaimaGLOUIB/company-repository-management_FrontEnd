import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutEquipementComponent } from './ajout-equipement.component';

describe('AjoutEquipementComponent', () => {
  let component: AjoutEquipementComponent;
  let fixture: ComponentFixture<AjoutEquipementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutEquipementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutEquipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
