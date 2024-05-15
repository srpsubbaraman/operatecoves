import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelTeamComponent } from './del-team.component';

describe('DelTeamComponent', () => {
  let component: DelTeamComponent;
  let fixture: ComponentFixture<DelTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelTeamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DelTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
