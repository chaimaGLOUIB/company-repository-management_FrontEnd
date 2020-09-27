import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutTypeConsommableComponent } from './ajout-type-consommable.component';

describe('AjoutTypeConsommableComponent', () => {
  let component: AjoutTypeConsommableComponent;
  let fixture: ComponentFixture<AjoutTypeConsommableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutTypeConsommableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutTypeConsommableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
