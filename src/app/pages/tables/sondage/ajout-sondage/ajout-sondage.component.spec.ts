import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutSondageComponent } from './ajout-sondage.component';

describe('AjoutSondageComponent', () => {
  let component: AjoutSondageComponent;
  let fixture: ComponentFixture<AjoutSondageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutSondageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutSondageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
