import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuneTeamComponent } from './pune-team.component';

describe('PuneTeamComponent', () => {
  let component: PuneTeamComponent;
  let fixture: ComponentFixture<PuneTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuneTeamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PuneTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
