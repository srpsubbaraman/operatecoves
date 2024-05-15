import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperateSyncComponent } from './operate-sync.component';

describe('OperateSyncComponent', () => {
  let component: OperateSyncComponent;
  let fixture: ComponentFixture<OperateSyncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperateSyncComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OperateSyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
