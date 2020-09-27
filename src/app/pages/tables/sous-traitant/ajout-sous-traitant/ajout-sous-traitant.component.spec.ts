import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutSousTraitantComponent } from './ajout-sous-traitant.component';

describe('AjoutSousTraitantComponent', () => {
  let component: AjoutSousTraitantComponent;
  let fixture: ComponentFixture<AjoutSousTraitantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutSousTraitantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutSousTraitantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
