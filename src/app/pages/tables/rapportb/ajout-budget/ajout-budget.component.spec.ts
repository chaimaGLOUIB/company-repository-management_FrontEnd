import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutBudgetComponent } from './ajout-budget.component';

describe('AjoutRapportbComponent', () => {
  let component: AjoutBudgetComponent;
  let fixture: ComponentFixture< AjoutBudgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [  AjoutBudgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
