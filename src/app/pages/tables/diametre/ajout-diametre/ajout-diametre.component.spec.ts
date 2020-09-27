import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutDiametreComponent } from './ajout-diametre.component';

describe('AjoutDiametreComponent', () => {
  let component: AjoutDiametreComponent;
  let fixture: ComponentFixture<AjoutDiametreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutDiametreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutDiametreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
