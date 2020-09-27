import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHorairePosteComponent } from './edit-horaire-poste.component';

describe('EditHorairePosteComponent', () => {
  let component: EditHorairePosteComponent;
  let fixture: ComponentFixture<EditHorairePosteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHorairePosteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHorairePosteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
