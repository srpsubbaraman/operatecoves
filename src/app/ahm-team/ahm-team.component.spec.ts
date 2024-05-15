import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhmTeamComponent } from './ahm-team.component';

describe('AhmTeamComponent', () => {
  let component: AhmTeamComponent;
  let fixture: ComponentFixture<AhmTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AhmTeamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AhmTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
