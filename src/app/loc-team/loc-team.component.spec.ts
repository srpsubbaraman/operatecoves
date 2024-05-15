import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocTeamComponent } from './loc-team.component';

describe('LocTeamComponent', () => {
  let component: LocTeamComponent;
  let fixture: ComponentFixture<LocTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocTeamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
