import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutAppareilComponent } from './ajout-appareil.component';

describe('AjoutAppareilComponent', () => {
  let component: AjoutAppareilComponent;
  let fixture: ComponentFixture<AjoutAppareilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutAppareilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutAppareilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
