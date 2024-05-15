import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroomingportalComponent } from './groomingportal.component';

describe('GroomingportalComponent', () => {
  let component: GroomingportalComponent;
  let fixture: ComponentFixture<GroomingportalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroomingportalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroomingportalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
