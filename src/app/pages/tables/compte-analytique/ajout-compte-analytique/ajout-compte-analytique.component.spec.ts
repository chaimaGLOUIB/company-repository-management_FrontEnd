import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutCompteAnalytiqueComponent } from './ajout-compte-analytique.component';

describe('AjoutCompteAnalytiqueComponent', () => {
  let component: AjoutCompteAnalytiqueComponent;
  let fixture: ComponentFixture<AjoutCompteAnalytiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutCompteAnalytiqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutCompteAnalytiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
