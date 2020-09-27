import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutMarqueConsommableComponent } from './ajout-marque-consommable.component';

describe('AjoutMarqueConsommableComponent', () => {
  let component: AjoutMarqueConsommableComponent;
  let fixture: ComponentFixture<AjoutMarqueConsommableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutMarqueConsommableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutMarqueConsommableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
