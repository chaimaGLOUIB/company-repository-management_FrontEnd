import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutCategoriePrestationComponent } from './ajout-categorie-prestation.component';

describe('AjoutCategoriePrestationComponent', () => {
  let component: AjoutCategoriePrestationComponent;
  let fixture: ComponentFixture<AjoutCategoriePrestationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutCategoriePrestationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutCategoriePrestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
