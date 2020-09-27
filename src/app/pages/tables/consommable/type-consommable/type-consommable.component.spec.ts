import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeConsommableComponent } from './type-consommable.component';

describe('TypeConsommableComponent', () => {
  let component: TypeConsommableComponent;
  let fixture: ComponentFixture<TypeConsommableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeConsommableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeConsommableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
