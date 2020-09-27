import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutRapportcComponent } from './ajout-rapportc.component';

describe('AjoutRapportcComponent', () => {
  let component: AjoutRapportcComponent;
  let fixture: ComponentFixture<AjoutRapportcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutRapportcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutRapportcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
