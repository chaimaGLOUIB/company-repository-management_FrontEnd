import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDiametreComponent } from './edit-diametre.component';

describe('EditDiametreComponent', () => {
  let component: EditDiametreComponent;
  let fixture: ComponentFixture<EditDiametreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDiametreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDiametreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
