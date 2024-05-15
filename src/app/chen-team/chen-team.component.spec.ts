import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChenTeamComponent } from './chen-team.component';

describe('ChenTeamComponent', () => {
  let component: ChenTeamComponent;
  let fixture: ComponentFixture<ChenTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChenTeamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChenTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
