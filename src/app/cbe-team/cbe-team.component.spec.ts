import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CbeTeamComponent } from './cbe-team.component';

describe('CbeTeamComponent', () => {
  let component: CbeTeamComponent;
  let fixture: ComponentFixture<CbeTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CbeTeamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CbeTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
