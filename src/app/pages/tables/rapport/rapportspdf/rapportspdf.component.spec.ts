import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportspdfComponent } from './rapportspdf.component';

describe('RapportpdfComponent', () => {
  let component: RapportspdfComponent;
  let fixture: ComponentFixture<RapportspdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RapportspdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RapportspdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
