import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutRegionComponent } from './ajout-region.component';

describe('AjoutRegionComponent', () => {
  let component: AjoutRegionComponent;
  let fixture: ComponentFixture<AjoutRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutRegionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
