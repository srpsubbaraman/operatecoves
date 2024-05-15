import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientQualificationComponent } from './client-qualification.component';

describe('ClientQualificationComponent', () => {
  let component: ClientQualificationComponent;
  let fixture: ComponentFixture<ClientQualificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientQualificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
