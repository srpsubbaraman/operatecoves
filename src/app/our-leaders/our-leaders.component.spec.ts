import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurLeadersComponent } from './our-leaders.component';

describe('OurLeadersComponent', () => {
  let component: OurLeadersComponent;
  let fixture: ComponentFixture<OurLeadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurLeadersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OurLeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
