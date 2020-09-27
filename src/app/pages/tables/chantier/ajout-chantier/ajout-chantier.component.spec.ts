import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutChantierComponent } from './ajout-chantier.component';

describe('AjoutChantierComponent', () => {
  let component: AjoutChantierComponent;
  let fixture: ComponentFixture<AjoutChantierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutChantierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutChantierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
