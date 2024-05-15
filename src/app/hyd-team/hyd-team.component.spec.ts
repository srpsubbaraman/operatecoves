import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HydTeamComponent } from './hyd-team.component';

describe('HydTeamComponent', () => {
  let component: HydTeamComponent;
  let fixture: ComponentFixture<HydTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HydTeamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HydTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
