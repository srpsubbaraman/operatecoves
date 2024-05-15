// home.component.ts
// import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Component, ElementRef, HostListener, Renderer2, ViewChild, CUSTOM_ELEMENTS_SCHEMA, OnInit  } from '@angular/core';
import {Chart,  ChartConfiguration } from 'chart.js';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { position } from 'html2canvas/dist/types/css/property-descriptors/position';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('slideAnimation', [
      transition('void => *', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition('* => void', [
        animate('300ms ease-out', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit{
//   constructor(private router: Router) {}
//   handleClick(): void {
//     this.router.navigate(['/CreateQuoteComponent']);
//   }
//   @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
//   @ViewChild('chartCanvas2') chartCanvas2!: ElementRef<HTMLCanvasElement>;

//   Operate_Delivery = 149;
//   Operate_COE = 19;
//   Shadow = 33;
//   Senior = 36;
//   Junior = 124;
//   Fresher = 33;

//   ngAfterViewInit() {
//     this.createCharts();
//   }

//   createCharts() {
//     this.createBarChart();
//     this.createDoughnutChart();
//   }

//   createBarChart() {
//     const canvas: HTMLCanvasElement | null = this.chartCanvas.nativeElement;
//     if (!canvas) {
//       console.error('Canvas element not found.');
//       return;
//     }

//     const ctx = canvas.getContext('2d');
//     if (!ctx) {
//       console.error('2D context not supported.');
//       return;
//     }

//     const chartConfig: ChartConfiguration = {
//       type: 'bar',
//       data: {
//         labels: ['Operate Delivery', 'Operate COE', 'Shadow'],
//         datasets: [{
//           label: 'Experience Levels',
//           data: [this.Operate_Delivery, this.Operate_COE, this.Shadow],
//           backgroundColor: [
//             'rgb(76,187,23)',
//             'rgb(34, 139, 34)',
//              'rgb(141,182,0)',
//           ],
//           borderColor: [
//             ' rgb(0,106,78)',
//             ' rgb(0,106,78)',
//             ' rgb(0,106,78)',
//           ],
//           borderWidth: 1
//         }]
//       },
//       options: {
//         responsive: true,
//         plugins: {
//           title: {
//             display: true,
//             text: 'Utilization'
//           }
//         }
//       }
//     };

//     new Chart(ctx, chartConfig);
//   }

//   createDoughnutChart() {
//     const canvas: HTMLCanvasElement | null = this.chartCanvas2.nativeElement;
//     if (!canvas) {
//       console.error('Canvas element not found.');
//       return;
//     }

//     const ctx = canvas.getContext('2d');
//     if (!ctx) {
//       console.error('2D context not supported.');
//       return;
//     }

//     const chartConfig: ChartConfiguration = {
//       type: 'doughnut',

//       data: {
//       labels: ['High', 'Med', 'Low'],
//           datasets: [{
//               label: 'Experience Levels',
//               data: [this.Senior, this.Junior, this.Fresher],
//               backgroundColor: [
//                   'rgb(76,187,23)',
//                   'rgb(34, 139, 34)',
//                   'rgb(141,182,0)',
//               ],
//               borderColor: [
//                   ' rgb(0,106,78)',
//                   ' rgb(0,106,78)',
//                   ' rgb(0,106,78)',
//               ],
//               borderWidth: 1
//           }]
//       },
//       options: {
//           responsive: true,
//           plugins: {
//               legend: {
//                   position: 'right', 
//                 } ,
//               title: {
//                   display: true,
//                   text: 'Experience Levels Distribution'
//               }
//           }
//       }
//   };

//   new Chart(ctx, chartConfig);
// }


//   // footer
 
//   redirectToEmail() {
//     window.location.href = 'mailto:inconetpsapopt@deloitte.com';
//   }
 
//   openTeamProfileInNewWindow() {
//     const teamProfileUrl = '/#/LocTeamComponent';
//     window.open(teamProfileUrl, '_blank');
//   }
 
 
//   redirectToMemories() {
   
//   }








//new



// intervalId: any;

// currentIndex = 0;

//   slides = [
//     {
//       image: 'https://via.placeholder.com/400x200',
//       text: 'Slide 1'
//     },
//     {
//       image: 'https://via.placeholder.com/400x200',
//       text: 'Slide 2'
//     }
//   ];

 
  // ngOnInit() {
  //   this.startAutoPlay(); // Start autoplay when the component initializes
  // }

  // ngOnDestroy() {
  //   this.stopAutoPlay(); // Stop autoplay when the component is destroyed
  // }

  // prevSlide() {
  //   this.currentIndex = (this.currentIndex === 0) ? this.slides.length - 1 : this.currentIndex - 1;
  // }

  // nextSlide() {
  //   this.currentIndex = (this.currentIndex === this.slides.length - 1) ? 0 : this.currentIndex + 1;
  // }

  // startAutoPlay() {
  //   this.intervalId = setInterval(() => {
  //     this.nextSlide(); // Advance to the next slide
  //   }, 3000); // Change slide every 3 seconds (adjust as needed)
  // }

  // stopAutoPlay() {
  //   clearInterval(this.intervalId); // Clear the interval to stop autoplay
  // }




  showNavigationArrows = true;
	showNavigationIndicators = false;



  bgPositionX: string = '0px';
  contentPositionX: number = 0;

  onWindowScroll1() {
    const scrollPosition = window.scrollY;
    this.bgPositionX = `-${scrollPosition * 0.25}px`;
    this.contentPositionX = scrollPosition * 0.5;
  }













text: HTMLElement | null;

constructor(private elementRef: ElementRef, private renderer: Renderer2, config: NgbCarouselConfig, private router: Router) {
  // Initialize the 'text' variable with the element reference
  this.text = this.elementRef.nativeElement.querySelector('#text');
  config.showNavigationArrows = true;
	config.showNavigationIndicators = true;
}


async beforeViewInit(){
  console.log("Now: "+Date.now());
 
  if(JSON.parse(localStorage.getItem('login_info')!).ttl >=Date.now()){
    // alert("Welcome, "+JSON.parse(localStorage.getItem('login_info')!).user)
  }
  else{
    this.logout();
  }
}


loading: boolean = true; // Initially set to true to show loader


async ngOnInit(){
  await this.beforeViewInit();
  setTimeout(() => {
      
    this.loading = false; // Set loading to false to hide the loader
  }, 2000);
  
  
 
  // this.startAutoPlay();
}

async logout(){
  localStorage.setItem('login_info',"{}");
 
  await this.router.navigate(['/Login']);
}



@HostListener('window:scroll', [])
onWindowScroll() {
  // Check if 'text' element exists before manipulating it
  if (this.text) {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const textHeight = this.text.clientHeight;
    const scrollThreshold = windowHeight / 2; // Adjust threshold as needed

    if (scrollPosition > scrollThreshold && scrollPosition < textHeight + scrollThreshold) {
      // Scrolled below the text, move to the right
      this.renderer.setStyle(this.text, 'transform', `translateX(${(scrollPosition - scrollThreshold) * 0.5}px)`);
    } else if (scrollPosition <= scrollThreshold) {
      // Scrolled above the text, move to the left
      this.renderer.setStyle(this.text, 'transform', 'translateX(0px)');
    }
  }
}

 







@ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
@ViewChild('chartCanvas2') chartCanvas2!: ElementRef<HTMLCanvasElement>;
@ViewChild('contactSection') contactSection!: ElementRef<HTMLDivElement>;
@ViewChild('aboutSection') aboutSection!: ElementRef<HTMLDivElement>;
@ViewChild('videosection') videosection!: ElementRef<HTMLDivElement>;


selectedOperate: string = 'Operate1';
isOperateSelected(operate: string): boolean {
  return this.selectedOperate === operate;
}
scrollToAboutSection() {
  if (this.aboutSection && this.aboutSection.nativeElement) {
    this.aboutSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}



scrollToContactSection() {
  if (this.contactSection && this.contactSection.nativeElement) {
    this.contactSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}

Operate_Delivery = 149;
Operate_COE = 19;
Shadow = 33;
Senior = 36;
Junior = 124;
Fresher = 33;

ngAfterViewInit() {
  this.createCharts();
}

createCharts() {
  this.createBarChart();
  this.createDoughnutChart();
}

createBarChart() {
  const canvas: HTMLCanvasElement | null = this.chartCanvas.nativeElement;
  if (!canvas) {
    console.error('Canvas element not found.');
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('2D context not supported.');
    return;
  }

  const chartConfig: ChartConfiguration = {
    type: 'bar',
    data: {
      labels: ['Operate Delivery', 'Operate COE', 'Shadow'],
      datasets: [{
        label: 'Experience Levels',
        data: [this.Operate_Delivery, this.Operate_COE, this.Shadow],
        backgroundColor: [
          'rgb(76,187,23)',
          'rgb(34, 139, 34)',
           'rgb(141,182,0)',
        ],
        borderColor: [
          ' rgb(0,106,78)',
          ' rgb(0,106,78)',
          ' rgb(0,106,78)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Utilization',
          color: '#000'
        
        }
      }
    }
  };

  new Chart(ctx, chartConfig);
}

createDoughnutChart() {
  const canvas: HTMLCanvasElement | null = this.chartCanvas2.nativeElement;
  if (!canvas) {
    console.error('Canvas element not found.');
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('2D context not supported.');
    return;
  }

  const chartConfig: ChartConfiguration = {
    type: 'doughnut',
    data: {
      labels: ['Senior', 'Mid/Junior', 'Fresher'],
      datasets: [{
        label: 'Experience Levels',
        data: [this.Senior, this.Junior, this.Fresher],
        backgroundColor: [
          'rgb(76,187,23)',
          'rgb(34, 139, 34)',
           'rgb(141,182,0)',
        ],
        borderColor: [
          ' rgb(0,106,78)',
          ' rgb(0,106,78)',
          ' rgb(0,106,78)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'left',
        },
        title: {
          display: true,
          text: 'Experience Levels Distribution',
          color: '#000'        
        }
      }
    }
  };

  new Chart(ctx, chartConfig);
}


// footer

redirectToEmail() {
  window.location.href = 'mailto:inconetpsapopt@deloitte.com';
}

openTeamProfileInNewWindow() {
  const teamProfileUrl = 'LocTeamComponent';
  window.open(teamProfileUrl, '_blank');
}


redirectToMemories() {
  const teamProfileUrl = 'MemoriesComponent';
  window.open(teamProfileUrl, '_blank');
}




operateSync() {
  this.router.navigate(['./OperateSync']);
}



}