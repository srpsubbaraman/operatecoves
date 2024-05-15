import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThaneTeamComponent } from './thane-team.component';

describe('ThaneTeamComponent', () => {
  let component: ThaneTeamComponent;
  let fixture: ComponentFixture<ThaneTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThaneTeamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThaneTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
