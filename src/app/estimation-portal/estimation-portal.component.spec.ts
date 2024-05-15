import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimationPortalComponent } from './estimation-portal.component';

describe('EstimationPortalComponent', () => {
  let component: EstimationPortalComponent;
  let fixture: ComponentFixture<EstimationPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstimationPortalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstimationPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
