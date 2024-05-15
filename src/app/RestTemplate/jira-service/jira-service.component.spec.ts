import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JiraServiceComponent } from './jira-service.component';

describe('JiraServiceComponent', () => {
  let component: JiraServiceComponent;
  let fixture: ComponentFixture<JiraServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JiraServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JiraServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
