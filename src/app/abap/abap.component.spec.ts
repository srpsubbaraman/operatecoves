import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbapComponent } from './abap.component';

describe('AbapComponent', () => {
  let component: AbapComponent;
  let fixture: ComponentFixture<AbapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
