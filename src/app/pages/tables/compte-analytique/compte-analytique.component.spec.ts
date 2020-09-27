import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteAnalytiqueComponent } from './compte-analytique.component';

describe('CompteAnalytiqueComponent', () => {
  let component: CompteAnalytiqueComponent;
  let fixture: ComponentFixture<CompteAnalytiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompteAnalytiqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompteAnalytiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
