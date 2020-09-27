import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriePrestationComponent } from './categorie-prestation.component';

describe('CategoriePrestationComponent', () => {
  let component: CategoriePrestationComponent;
  let fixture: ComponentFixture<CategoriePrestationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriePrestationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriePrestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
