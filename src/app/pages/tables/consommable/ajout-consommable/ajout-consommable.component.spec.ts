import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutConsommableComponent } from './ajout-consommable.component';

describe('AjoutConsommableComponent', () => {
  let component: AjoutConsommableComponent;
  let fixture: ComponentFixture<AjoutConsommableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutConsommableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutConsommableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
