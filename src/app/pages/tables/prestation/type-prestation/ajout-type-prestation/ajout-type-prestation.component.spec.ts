import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutTypePrestationComponent } from './ajout-type-prestation.component';

describe('AjoutTypePrestationComponent', () => {
  let component: AjoutTypePrestationComponent;
  let fixture: ComponentFixture<AjoutTypePrestationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutTypePrestationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutTypePrestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
