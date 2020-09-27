import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorairePosteComponent } from './horaire-poste.component';

describe('HorairePosteComponent', () => {
  let component: HorairePosteComponent;
  let fixture: ComponentFixture<HorairePosteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorairePosteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorairePosteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
