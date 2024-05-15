import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipoComponent } from './pipo.component';

describe('PipoComponent', () => {
  let component: PipoComponent;
  let fixture: ComponentFixture<PipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
