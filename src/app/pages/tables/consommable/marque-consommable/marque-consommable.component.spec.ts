import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarqueConsommableComponent } from './marque-consommable.component';

describe('MarqueConsommableComponent', () => {
  let component: MarqueConsommableComponent;
  let fixture: ComponentFixture<MarqueConsommableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarqueConsommableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarqueConsommableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
