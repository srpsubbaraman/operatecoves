import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, Renderer2, ViewChild, OnInit, EventEmitter, Output } from '@angular/core';
import { PdfDownloadService } from '../pdf-download.service';
import { Client } from '../models/clients';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap'; 
import { Router } from '@angular/router'; 
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-operate-sync',
  templateUrl: './operate-sync.component.html',
  styleUrl: './operate-sync.component.css'
})


export class OperateSyncComponent implements OnInit {
  qrCodeData: string | undefined;
  
  loading: boolean = true; 

 async ngOnInit() {
    console.log("Login: "+localStorage.getItem('login_info'));
    //console.log("In TTL? : "+ String((Date.now() - JSON.parse(localStorage.getItem('login_info')!).ttl) <=300000 ))
  if(localStorage.getItem('login_info')!=null){
    if(localStorage.getItem('login_info')!="{}" && JSON.parse(localStorage.getItem('login_info')!).ttl >=Date.now()){
      console.log("in there!");
      
    }
    else{
       localStorage.setItem('login_info',"{}");
       await this.router.navigate(['/Login']); 
       
    }
  }
  else{
    localStorage.setItem('login_info',"{}");
    await this.router.navigate(['/Login']); 
    
 }
setTimeout(() => {
      
  this.loading = false; // Set loading to false to hide the loader
}, 2000);




const pdfUrl = 'assets/documents/OperateSync_Brochure.pdf';
    this.generateQRCode(pdfUrl);



  }



  generateQRCode(data: string): void {
    QRCode.toDataURL(data)
      .then(url => {
        this.qrCodeData = url;
      })
      .catch(err => {
        console.error('Error generating QR code:', err);
      });
  }

  // onQRCodeScanned(event: Event): void {
  //   this.downloadPDF(event);
  // }

  onQRCodeScanned(event: Event): void {
    // URL of the PDF file you want to download
    const pdfUrl = 'assets/documents/OperateSync_Brochure.pdf';
    console.log(pdfUrl);
    
    // Redirect the user to the PDF file's URL
    window.location.href = pdfUrl;
  }
  
  @ViewChild('carousel') carousel!: NgbCarousel;


  nextSlide(): void {
    this.carousel.next(); // Move to the next slide
  }

  prevSlide(): void {
    this.carousel.prev(); // Move to the previous slide
  }


  isSidenavOpened = true;

  toggleSidenav() {
    this.isSidenavOpened = !this.isSidenavOpened;
  }

  onSidenavToggle(isOpened: boolean) {
    
  }



// new
text: HTMLElement | null;

constructor(private elementRef: ElementRef, private renderer: Renderer2 , private router: Router) {
  // Initialize the 'text' variable with the element reference
  this.text = this.elementRef.nativeElement.querySelector('#text');
  console.log(this.clients)
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




clients: Client[] = [
  { name: 'VKL', logoUrl: 'assets/images/logo/VKL.png'},
  { name: 'ALEMBIC', logoUrl: 'assets/images/logo/ALEMBIC.png' },
  { name: 'CHEMCO', logoUrl: 'assets/images/logo/CHEMCO.png'},
  { name: 'GRIDCO', logoUrl: 'assets/images/logo/GRIDCO.png' },
  { name: 'GULF OIL', logoUrl: 'assets/images/logo/GULF_OIL.png' },
  { name: 'KAISHA LIFESCIENCE', logoUrl: 'assets/images/logo/kaisha_lifesciences.png' },
  { name: 'MANILDRA', logoUrl: 'assets/images/logo/MANILDRA.png' },
  { name: 'NEOM', logoUrl: 'assets/images/logo/NEOM.png' },
  { name: 'KAISHA SOVEREIGN', logoUrl: 'assets/images/logo/kaisha_sovereign.png' },
  { name: 'NESCO', logoUrl: 'assets/images/logo/NESCO.png' },
  { name: 'KAISHA PACKAGING', logoUrl: 'assets/images/logo/kaisha_packaging.png' },
  { name: 'PRIVI', logoUrl: 'assets/images/logo/PRIVI.png' },
  { name: 'BANKING SBI FUNDS MANAGEMENT', logoUrl: 'assets/images/logo/SBI.png' },
  { name: 'STG', logoUrl: 'assets/images/logo/STG.png' },
  { name: 'TABREED', logoUrl: 'assets/images/logo/TABREED.png' },
  { name: 'V-GUARD', logoUrl: 'assets/images/logo/V_GUARD.png' },
];


downloadPDF(event: Event) {
  // URL of the PDF file
  event.preventDefault();
  const pdfUrl = ("assets/documents/OperateSync_Brochure.pdf");
  console.log(pdfUrl) // Update the path as per your project structure

  // Create a link element
  const link = document.createElement('a');
  link.href = pdfUrl;
  link.download = 'OperateSync_Brochure.pdf'; // File name when downloaded
  document.body.appendChild(link);

  // Trigger the download
  link.click();

  // Clean up
  document.body.removeChild(link);

}



  // downloadFile(): void {
  //   const filename = 'OperateSync Brochure.pdf'; // Change this to your file name
  //   const filePath = '/OperateCOvE/src/assets/documents/' + filename;

  //   fetch(filePath)
  //     .then(response => response.blob())
  //     .then(blob => {
  //       // Create anchor element
  //       const link = document.createElement('a');
  //       link.href = window.URL.createObjectURL(blob);
  //       link.download = filename;

  //       // Trigger the download
  //       link.click();
  //     })
  //     .catch(error => console.error('Error downloading file:', error));
  // }


  // downloadFile(): void {
  //   const filename = 'OperateSync Brochure.pdf'; 
  //   const url = `/OperateCOvE/src/assets/documents/${filename}`;

  //   this.http.get(url, { responseType: 'blob' }).subscribe((response: Blob) => {
  //     const blob = new Blob([response], { type: response.type });

  //     // Create anchor element
  //     const link = document.createElement('a');
  //     link.href = window.URL.createObjectURL(blob);
  //     link.download = filename;

  //     // Trigger the download
  //     link.click();
  //   }, error => {
  //     console.error('Error downloading file:', error);
  //   });
  // }













}


