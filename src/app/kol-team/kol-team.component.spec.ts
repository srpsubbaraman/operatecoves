import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KolTeamComponent } from './kol-team.component';

describe('KolTeamComponent', () => {
  let component: KolTeamComponent;
  let fixture: ComponentFixture<KolTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KolTeamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KolTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
