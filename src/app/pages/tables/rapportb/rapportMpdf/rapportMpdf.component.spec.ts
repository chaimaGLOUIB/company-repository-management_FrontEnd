import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportMpdfComponent } from './rapportMpdf.component';

describe('RapportpdfComponent', () => {
  let component: RapportMpdfComponent;
  let fixture: ComponentFixture<RapportMpdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RapportMpdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RapportMpdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
