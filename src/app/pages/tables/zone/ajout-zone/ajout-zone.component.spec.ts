import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutZoneComponent } from './ajout-zone.component';

describe('AjoutZoneComponent', () => {
  let component: AjoutZoneComponent;
  let fixture: ComponentFixture<AjoutZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
