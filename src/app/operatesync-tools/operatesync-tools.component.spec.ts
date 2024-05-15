import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatesyncToolsComponent } from './operatesync-tools.component';

describe('OperatesyncToolsComponent', () => {
  let component: OperatesyncToolsComponent;
  let fixture: ComponentFixture<OperatesyncToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperatesyncToolsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OperatesyncToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
