import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BhuTeamComponent } from './bhu-team.component';

describe('BhuTeamComponent', () => {
  let component: BhuTeamComponent;
  let fixture: ComponentFixture<BhuTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BhuTeamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BhuTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
