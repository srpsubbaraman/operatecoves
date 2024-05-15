import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EstimationPortalComponent } from '../estimation-portal/estimation-portal.component';

interface Process {
  number: number;
  title: string;
  description: string;
  videoUrl?: string;
  color: string; 
  lineColor: string;
  iconClass: string;
  border:string;
  // line:string;

}

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent {
 
  currentStep: number = 0;
  showProcessDetails: boolean = false;
  showDashboardComponent: boolean = false;
  constructor(private sanitizer: DomSanitizer,private router: Router,private estimationPortalComponent: EstimationPortalComponent) {}

  processes: Process[] = [
    { number: 1,title: 'Dashboard', border:'4px solid #0076a8',description: 'This gives a view of Unified dashboard of your estimation across different modules.', color: '#0076a8', lineColor: '#0076a8', iconClass: 'fas fa-chart-line' },
    // { number: 2, title: 'Client Qualification', videoUrl: '/assets/videos/OS_Intro_FemaleVoice.mp4', description: 'Description of the client qualification process in Estimation Portal.', color: '#0000FF', lineColor: '#6060f0', iconClass: 'fas fa-user-check' },
    { number: 2,title: 'Basic information such as client details are captured in General information section.',border:'4px solid #00abab', description: 'General Info', color: '#00abab', lineColor: '#00abab', iconClass: 'fa fa-info-circle' },
    { number: 3, title: 'ABAP',border:'4px solid #26890d' ,description: 'Pre-requisites of ABAP Estimation is captured before moving on to efforts.', color: '#26890d', lineColor: '#26890d', iconClass: 'fas fa-cogs' },
    { number: 4, title: 'This section helps you to create estimation for your client,view total efforts and breakup.', border:'4px solid rgb(13, 131, 144)',description: 'Efforts', color: 'rgb(13, 131, 144)', lineColor: 'rgb(13, 131, 144)', iconClass: 'fas fa-stopwatch' },
    { number: 5,title: 'Estimation',border:'4px solid #ed8b00 ', description: 'Offering Effort Estimation Best Practices and Breakdown for Clients based on types', color: '#ed8b00', lineColor: '#ed8b00', iconClass: 'fas fa-tasks' },
  ];

  openProcessDetails(stepNumber: number): void {
    this.currentStep = stepNumber;
    this.showProcessDetails = true;
  }
  getVideoUrl(): SafeResourceUrl {
    const videoUrl = this.processes[this.currentStep - 1]?.videoUrl || '';
    return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }
  toggleProcessDetails(): void {
    if (this.currentStep === 0) {
      // If the current step is 0, toggle the process details
      this.showProcessDetails = !this.showProcessDetails;
      if (this.showProcessDetails) {
        this.currentStep = 1; 
      }
    } else {
      // Call the showDashboard() function from the EstimationPortalComponent
      this.estimationPortalComponent.showDashboard();
    }
  }

  goNext(): void {
    if (this.currentStep < this.processes.length) {
      this.currentStep++;
    }
    if (this.currentStep === this.processes.length) {
      this.showProcessDetails = false; 
    }
  }

  goBack(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  get process(): Process {
    return this.processes[this.currentStep - 1];
  }

  closeCard() {
    this.showProcessDetails = false; 
}
  // drawInfographic() {
  //   const canvas = this.canvas.nativeElement;
  //   const ctx = canvas.getContext('2d');

  //   if (ctx) {
  //     // Define the colors for each process step
  //     const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#9966FF', '#4BC0C0', '#FF9F40', '#8E44AD'];

  //     // Draw the infographic elements
  //     let x = 50;
  //     let y = canvas.height / 2;
  //     const radius = 30;

  //     ctx.font = '16px Arial';
  //     ctx.textAlign = 'center';

  //     for (let i = 0; i < this.processes.length; i++) {
  //       ctx.beginPath();
  //       ctx.arc(x, y, radius, 0, 2 * Math.PI);
  //       ctx.fillStyle = colors[i];
  //       ctx.fill();
  //       ctx.strokeStyle = 'black';
  //       ctx.stroke();

  //       ctx.fillStyle = 'white';
  //       ctx.fillText(`${this.processes[i].number}`, x, y + 6);

  //       if (i < this.processes.length - 1) {
  //         ctx.beginPath();
  //         ctx.moveTo(x + radius, y);
  //         x += 150;
  //         ctx.lineTo(x - radius, y);
  //         ctx.stroke();
  //       } else {
  //         x += 150;
  //       }
  //     }
  //   } else {
  //     console.error('Failed to get canvas rendering context');
  //   }
  // }


}