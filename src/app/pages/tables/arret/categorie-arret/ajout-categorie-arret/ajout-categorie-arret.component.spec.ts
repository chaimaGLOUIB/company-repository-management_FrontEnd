import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutCategorieArretComponent } from './ajout-categorie-arret.component';

describe('AjoutCategorieArretComponent', () => {
  let component: AjoutCategorieArretComponent;
  let fixture: ComponentFixture<AjoutCategorieArretComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutCategorieArretComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutCategorieArretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
