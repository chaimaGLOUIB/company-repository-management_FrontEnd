import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutHorairePosteComponent } from './ajout-horaire-poste.component';

describe('AjoutHorairePosteComponent', () => {
  let component: AjoutHorairePosteComponent;
  let fixture: ComponentFixture<AjoutHorairePosteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutHorairePosteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutHorairePosteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
