import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportcComponent } from './rapportc.component';

describe('RapportcComponent', () => {
  let component: RapportcComponent;
  let fixture: ComponentFixture<RapportcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RapportcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RapportcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
