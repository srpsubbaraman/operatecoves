import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MUMTeamComponent } from './mum-team.component';

describe('MUMTeamComponent', () => {
  let component: MUMTeamComponent;
  let fixture: ComponentFixture<MUMTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MUMTeamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MUMTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
