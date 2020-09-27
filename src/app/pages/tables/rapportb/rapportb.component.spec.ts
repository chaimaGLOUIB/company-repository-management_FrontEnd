import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RapportMpdfComponent } from './rapportMpdf/rapportMpdf.component';
import { RapportbComponent } from './rapportb.component';


describe('RapportMComponent', () => {
  let component: RapportbComponent;
  let fixture: ComponentFixture<RapportbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RapportbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent( RapportbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
