import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeArretComponent } from './type-arret.component';

describe('TypeArretComponent', () => {
  let component: TypeArretComponent;
  let fixture: ComponentFixture<TypeArretComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeArretComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeArretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
