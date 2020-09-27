import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutRapportbComponent } from './ajout-rapportb.component';

describe('AjoutRapportbComponent', () => {
  let component: AjoutRapportbComponent;
  let fixture: ComponentFixture<AjoutRapportbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutRapportbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutRapportbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
