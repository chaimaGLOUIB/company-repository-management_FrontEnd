import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiametreComponent } from './diametre.component';

describe('DiametreComponent', () => {
  let component: DiametreComponent;
  let fixture: ComponentFixture<DiametreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiametreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiametreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
