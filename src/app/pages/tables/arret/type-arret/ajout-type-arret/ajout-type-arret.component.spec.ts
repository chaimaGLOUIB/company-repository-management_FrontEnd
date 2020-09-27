import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutTypeArretComponent } from './ajout-type-arret.component';

describe('AjoutTypeArretComponent', () => {
  let component: AjoutTypeArretComponent;
  let fixture: ComponentFixture<AjoutTypeArretComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutTypeArretComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutTypeArretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
