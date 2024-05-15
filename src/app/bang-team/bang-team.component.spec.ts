import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BangTeamComponent } from './bang-team.component';

describe('BangTeamComponent', () => {
  let component: BangTeamComponent;
  let fixture: ComponentFixture<BangTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BangTeamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BangTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
