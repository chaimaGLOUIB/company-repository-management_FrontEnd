import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieArretComponent } from './categorie-arret.component';

describe('CategorieArretComponent', () => {
  let component: CategorieArretComponent;
  let fixture: ComponentFixture<CategorieArretComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorieArretComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorieArretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
